import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

// Initial state
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {},
    isLoading: false,
    error: null,
};

// Async thunks
export const createAccount = createAsyncThunk('/admin/register', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/register', data);
        toast.success(response.data.message);
        return response.data;
    } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to create an account");
        return rejectWithValue(e?.response?.data?.message || "Failed to create an account");
    }
});

export const loginAccount = createAsyncThunk('/admin/login', async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        
        const response = await axiosInstance1.post('/admin/login', data);
        toast.success(response.data.message);
        return response.data;
    } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to login");
        return rejectWithValue(e?.response?.data?.message || "Failed to login");
    }
});

export const logout = createAsyncThunk('/admin/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance1.post('/admin/logout');
        toast.success(response.data.message);
        return response.data;
    } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to logout");
        return rejectWithValue(e?.response?.data?.message || "Failed to logout");
    }
});

export const userProfile = createAsyncThunk('/admin/details', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/me');
        return response.data;
    } catch (e) {
        toast.error(e?.message || "Failed to fetch user profile");
        return rejectWithValue(e?.message || "Failed to fetch user profile");
    }
});

// Create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.admin));
                localStorage.setItem('role', action.payload.admin.role);
                state.data = action.payload.admin;
                state.role = action.payload.admin.role;
                state.isLoading = false;
                state.isLoggedIn = true;
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                console.log(action);
                
                localStorage.setItem('data', JSON.stringify(action.payload.data));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', action.payload.data.role);
                state.data = action.payload.data;
                state.role = action.payload.data.role;
                state.isLoading = false;
                state.isLoggedIn = true;
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.role = "";
                state.isLoggedIn = false;
                state.isLoading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.admin));
                localStorage.setItem('role', action.payload.admin.role);
                state.data = action.payload.admin;
                state.role = action.payload.admin.role;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
