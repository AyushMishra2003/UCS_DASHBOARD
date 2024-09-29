import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance1 from '../../Helper/axiosInstace1'; // Update the path as needed
import { toast } from 'sonner';

const initialState = {
    loading: false,
    error: null,
    dynamicPage:[],
    sections:[]
 
};



export const getAllPages = createAsyncThunk(
    'discounts/getCategory',
    async (_,{ rejectWithValue }) => {
        try {
            
            const response = await axiosInstance1.get(`/dynamic`);
            console.log(response);
            
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getSections = createAsyncThunk(
    'discounts/section',
    async (name,{ rejectWithValue }) => {
        try {
            console.log(name);
            
            const response = await axiosInstance1.get(`/dynamic/${name}`);
            console.log(response);
            
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);





const dynamicSlice = createSlice({
    name: 'dynamicList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getAllPages.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getSections.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllPages.fulfilled, (state, action) => {
        state.loading = false;
        state.dynamicPage= action?.payload?.data;
    })
    .addCase(getSections.fulfilled, (state, action) => {
        console.log(action);
        
        state.loading = false;
        state.sections= action?.payload?.sections;
    })
    .addCase(getAllPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(getSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    },
});

export default  dynamicSlice.reducer;
