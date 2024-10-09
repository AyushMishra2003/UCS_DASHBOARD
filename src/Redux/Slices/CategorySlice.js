import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance1 from '../../Helper/axiosInstace1'; // Update the path as needed
import { toast } from 'sonner';

const initialState = {
    loading: false,
    error: null,
    airpotRates: [],
    categoryList:[]
};


export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (categoryData, { rejectWithValue }) => {
        try {
            console.log(categoryData);
            const formData=new FormData()

            formData.append("photo",categoryData.photo)
            formData.append("numberOfBags",categoryData.numberOfBags
            )
            formData.append("numberOfSeats",categoryData.numberOfSeats)
            formData.append("acAvailable",categoryData.acAvailable)
            formData.append("name",categoryData.name)
            
            const response = await axiosInstance1.post(`/${categoryData.tripType}`,formData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async ( tripType,{ rejectWithValue }) => {
        try {
            
            // const formData=new FormData()

            // formData.append("photo",categoryData.photo)
            // formData.append("numberOfBags",categoryData.numberOfBags
            // )
            // formData.append("numberOfSeats",categoryData.numberOfSeats)
            // formData.append("acAvailable",categoryData.acAvailable)
            // formData.append("name",categoryData.name)

            console.log(tripType);
            
            
            const response = await axiosInstance1.get(`/${tripType}`);
            console.log(response);
            
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCategoryList = createAsyncThunk(
    'category/updateCategory',
    async ( {updatedCategory,tripType},{ rejectWithValue }) => {
        try {
            
            console.log(updatedCategory);
            console.log(tripType);
            console.log(updatedCategory._id);
            
            
            
            const formData=new FormData()

            formData.append("photo",updatedCategory.photo)
            formData.append("numberOfBags",updatedCategory.numberOfBags
            )
            formData.append("numberOfSeats",updatedCategory.numberOfSeats)
            formData.append("acAvailable",updatedCategory.acAvailable)
            formData.append("name",updatedCategory.name)
            
            const response = await axiosInstance1.put(`/${tripType}/${updatedCategory._id}`,formData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategoryList = createAsyncThunk(
    'category/deleteCategory',
    async ( {tripType,categoryId},{ rejectWithValue }) => {
        try {
            
            console.log(categoryId);
            console.log(tripType);
            
            
            const response = await axiosInstance1.delete(`/${tripType}/${categoryId}`);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addRoundRate = createAsyncThunk(
    'round/rate',
    async ({data,id}, { rejectWithValue }) => {
        try {
            console.log("aaya mai");
            
            console.log(data);
            
            console.log(id);
            
            
            // const formData=new FormData()

            // formData.append("photo",categoryData.photo)
            // formData.append("numberOfBags",categoryData.numberOfBags
            // )
            // formData.append("numberOfSeats",categoryData.numberOfSeats)
            // formData.append("acAvailable",categoryData.acAvailable)
            // formData.append("name",categoryData.name)
            
            const response = await axiosInstance1.post(`/round/rate/${id}`,data);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);

export const  deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async ( id,{ rejectWithValue }) => {
        try {
            
            
            const response = await axiosInstance1.delete(`/round/${id}`);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add discount');
            return rejectWithValue(error.response.data);
        }
    }
);


export const verifyVoucher = createAsyncThunk('/user/cancel-bookings', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post(`/discount/valid`, data);

        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});











const categorySlice = createSlice({
    name: 'categoryList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList= action.payload.data;
    })
    .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    },
});

export default  categorySlice.reducer;
