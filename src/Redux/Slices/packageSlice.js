import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

const initialState = {
    loading: false,
    error: null,
    operators: []
};


export const changeStatus = createAsyncThunk('/admin/status', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post('/admin/status', data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const addPackage = createAsyncThunk('/add/package', async (formData, { rejectWithValue }) => {
    try {
        console.log("form data is",formData);
        
        const res = await axiosInstance1.post('/package', formData);
        console.log(res)
        
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const addOperator = createAsyncThunk('/admin/add', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post('/admin/add', data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const getOperators = createAsyncThunk('/admin/operators', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get('/admin/operator');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                state.loading = false;
                // Find the operator in the list and update their status
                const operatorIndex = state.operators.findIndex(operator => operator.email === action.meta.arg.email);
                if (operatorIndex !== -1) {
                    state.operators[operatorIndex].status = action.meta.arg.status;
                }
            })
            .addCase(changeStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to change status';
            })
            .addCase(getOperators.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOperators.fulfilled, (state, action) => {
                state.loading = false;
                state.operators = action?.payload?.data; // Populate the operators array with fetched data
            })
            .addCase(getOperators.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch operators';
            });
    }
});

export default packageSlice.reducer;
