import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance1 from '../../Helper/axiosInstace1'; // Update the path as needed
import { toast } from 'sonner';

const initialState = {
    loading: false,
    error: null,
    localRates: [],
    categoryList:[]
};

// Async thunks
export const fetchLocalRates = createAsyncThunk(
    'LocalRates/fetchRates',
    async (_, { rejectWithValue }) => {
        try {
            console.log("fetch local rates");
            
            const response = await axiosInstance1.get('/local/getRate');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addLocalRate = createAsyncThunk(
    'cityRates/addRate',
    async (rateData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.post('/local/addRate', rateData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateLocalRate = createAsyncThunk(
    'cityRates/updateRate',
    async (data, { rejectWithValue }) => {
        try {
             console.log(data);

             const data1={
                category:data.category.name,
                cityName:data.cityName,
                perHour:data.perHour,
                perKm:data.perKm,
                rateFor80Km8Hours:data.rateFor80Km8Hours,
                rateFor100Km8Hours:data.rateFor100Km8Hours
             }
            
            const response = await axiosInstance1.put(`/local/rate/update`,data1);
            toast.success(response.data.message);
            // return { fromCity, toCity, category, rate: newRate };
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteLocalRate = createAsyncThunk(
    'cityRates/deleteRate',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);

            console.log(data);
            
            
            const response=await axiosInstance1.delete(`/local/rate/delete`,{data});
            toast.success('Rate deleted successfully');
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCategory = createAsyncThunk(
    'local/getCategory',
    async (_, { rejectWithValue }) => { // Use `_` when no arguments are passed
        try {
            console.log("Fetching category from the API...");
            const response = await axiosInstance1.get(`/local`);
            toast.success('Category fetched successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch category');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCategory = createAsyncThunk(
    'local/addCategory',
    async (data, { rejectWithValue }) => { // Use `_` when no arguments are passed
        try {
            console.log(data);
            
            console.log("Fetching category from the API...");
            const response = await axiosInstance1.post(`/local`,data);
            toast.success('Category Added successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch category');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    'local/deleteCategory',
    async (id, { rejectWithValue }) => { // Use `_` when no arguments are passed
        try {
            console.log(id);
            
            console.log("Fetching category from the API...");
            const response = await axiosInstance1.delete(`/local/${id}`);
            toast.success('Category Delete successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch category');
            return rejectWithValue(error.response.data);
        }
    }
);

export const  editCategory = createAsyncThunk(
    'local/editCategory',
    async ({data,id}, { rejectWithValue }) => { // Use `_` when no arguments are passed
        try {
            console.log(data,id);
            
            const response = await axiosInstance1.put(`/local/${id}`,data);
            toast.success('Category Updated fetched successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch category');
            return rejectWithValue(error.response.data);
        }
    }
);


export const deleteLocalCity = createAsyncThunk(
    'cityRates/deleteCity',
    async (cityName, { rejectWithValue }) => {
        try {
           
            console.log(cityName);
            const data={
                cityName
            }
            console.log(data);
            
            
            
            const response=await axiosInstance1.delete(`/local/rate/deleteCity`,{data});
            toast.success('Rate deleted successfully');
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete rate');
            return rejectWithValue(error.response.data);
        }
    }
);



export const  addLocalCity = createAsyncThunk(
    'local/editCategory',
    async (data, { rejectWithValue }) => { // Use `_` when no arguments are passed
        try {
            // console.log(data,id);

            console.log(data);
            
            
            const response = await axiosInstance1.post(`local/add/city`,data);
            toast.success('City Added successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch category');
            return rejectWithValue(error.response.data);
        }
    }
);




const cityLocalRateSlice = createSlice({
    name: 'localCityRates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocalRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocalRates.fulfilled, (state, action) => {
                state.loading = false;
                state.localRates = action.payload.data;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryList = action.payload.data;
            })
            .addCase(fetchLocalRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default cityLocalRateSlice.reducer;
