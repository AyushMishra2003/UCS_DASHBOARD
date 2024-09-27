import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance1 from '../../Helper/axiosInstace1'; // Update the path as needed
import { toast } from 'sonner';

// Initial state for the discount slice
const initialState = {
    loading: false,
    error: null,
    discounts: [],
    users:[],
    history:[]
};

// Async thunks for discount operations
export const fetchDiscounts = createAsyncThunk(
    'discounts/fetchDiscounts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get('/discount');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch discounts');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addDiscount = createAsyncThunk(
    'discounts/addDiscount',
    async (discountData, { rejectWithValue }) => {
        try {
            console.log(discountData);
            
            const response = await axiosInstance1.post('/discount', discountData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateDiscount = createAsyncThunk(
    'discounts/updateDiscount',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            console.log(updateData);
            
            const response = await axiosInstance1.put(`/discount/update/${id}`, updateData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteDiscount = createAsyncThunk(
    'discounts/deleteDiscount',
    async ({id}, { rejectWithValue }) => {
        try {
            console.log("kya babau");
            console.log(id);
            
            
            const response=await axiosInstance1.delete(`/discount/${id}`);
            console.log(response);
            
            toast.success('Discount deleted successfully');
            return id;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const changeDiscountStatus = createAsyncThunk(
    'discounts/changeDiscountStatus',
    async ({ id, active }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.put(`/discount/${id}`, { active });
            toast.success(response.data.message);
            return { id, active };
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to change discount status');
            return rejectWithValue(error.response.data);
        }
    }
);


export const getUser = createAsyncThunk(
    'user/allcustomer',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get('/user/users');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch discounts');
            return rejectWithValue(error.response.data);
        }
    }
);

export const userHistory = createAsyncThunk(
    'user/history',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get(`/user/history/${id}`);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch discounts');
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateUser = createAsyncThunk(
    'user/allcustomer',
    async (formData, { rejectWithValue }) => {
        try {
            console.log(formData);

            const data=new FormData()

            data.append("name",formData.name)
            data.append("phoneNumber",formData.phoneNumber)
            data.append("isVerify",formData.isVerify)
            
            const response = await axiosInstance1.put(`/user/updateProfile/${formData.id}`,data);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch discounts');
            return rejectWithValue(error.response.data);
        }
    }
);



// Create the slice
const discountSlice = createSlice({
    name: 'discounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiscounts.fulfilled, (state, action) => {
                state.loading = false;
                state.discounts = action.payload.data;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(userHistory.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action);
                
                state.history = action.payload.bookingHistory;
            })
            .addCase(fetchDiscounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addDiscount.fulfilled, (state, action) => {
                state.discounts.push(action.payload.data);
            })
            .addCase(updateDiscount.fulfilled, (state, action) => {
                const updatedDiscount = action.payload.data;
                const discountIndex = state.discounts.findIndex(d => d._id === updatedDiscount._id);
                if (discountIndex !== -1) {
                    state.discounts[discountIndex] = updatedDiscount;
                }
            })
            .addCase(deleteDiscount.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.discounts = state.discounts.filter(d => d._id !== deletedId);
            })
            .addCase(changeDiscountStatus.fulfilled, (state, action) => {
                const { id, active } = action.payload;
                const discount = state.discounts.find(d => d._id === id);
                if (discount) {
                    discount.active = active;
                }
            });
    },
});

export default discountSlice.reducer;
