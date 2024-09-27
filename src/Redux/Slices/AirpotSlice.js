import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance1 from '../../Helper/axiosInstace1'; // Update the path as needed
import { toast } from 'sonner';

const initialState = {
    loading: false,
    error: null,
    airpotRates: [],
    roundRates:[],
    categoryList:[]
};

// Async thunks
export const fetchAirpotRates = createAsyncThunk(
    'airpotRates/fetchRates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get('/airpot/rate/alllist');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchRoundRates = createAsyncThunk(
    'roundRates/fetchRates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get('/round/city/rate/all/list');
            console.log(response);
            
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addAirpotRate = createAsyncThunk(
    'airpot/addRate',
    async (data, { rejectWithValue }) => {
        try {
             
            console.log(data);
            
            const response = await axiosInstance1.post(`/airpot/rate`, data);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addRoundRate = createAsyncThunk(
    'round/addRate',
    async (data, { rejectWithValue }) => {
        try {
             
            console.log(data);
            
            const response = await axiosInstance1.post(`/round/city/rate`, data);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteAirpotRate = createAsyncThunk(
    'airpot/deleteRate',
    async (data, { rejectWithValue }) => {
        try {
             
            console.log(data);
            
            const response = await axiosInstance1.delete(`/airpot/rate`, {data});
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add rate');
            return rejectWithValue(error.response.data);
        }
    }
);


export const addAirpotCategory = createAsyncThunk(
    'airpot/addCategory',
    async ({data}, { rejectWithValue }) => {
        try {
            // console.log(id,data);


            console.log(data);
            
            
            
            const response = await axiosInstance1.post(`/airpot`, data);
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

export const updateRoundRate = createAsyncThunk(
    'cityRates/updateRate',
    async (data, { rejectWithValue }) => {
        try {
           
            console.log(data);
            
            
            const response = await axiosInstance1.put(`/round/city/rate/p1`,data);
            toast.success(response.data.message);
            // return { fromCity, toCity, category, rate: newRate };
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update rate');
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateAirpotRate = createAsyncThunk(
    'airpotRates/updateRate',
    async (updatedRate, { rejectWithValue }) => {
        try {
             console.log(updatedRate);

            //  const data1={
            //     kilometer:data.kilometer,
            //     rate:data.rate,
            //     extra:data.extra
            //  }
            
            const response = await axiosInstance1.put(`/airpot/rate/update`,updatedRate);
            toast.success(response.data.message);
            return response.data
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
            
            const response=await axiosInstance1.delete(`/local/rate/delete`,{data});
            toast.success('Rate deleted successfully');
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteRoundRate = createAsyncThunk(
    'cityRates/deleteRoundRate',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            
            const response=await axiosInstance1.delete(`/round/city/rate/dlt`,{data});
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

export const  deleteRoundCity = createAsyncThunk(
    'local/editCategory',
    async (cityName, { rejectWithValue }) => { // Use `_` when no arguments are passed
        try {
            // console.log(data,id);

            console.log(cityName);

            const data={
                cityName:cityName
            }

            console.log(data);
            
            
            
            const response = await axiosInstance1.delete(`round/city/rate/delete`,{data});
            toast.success('City Delete successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch category');
            return rejectWithValue(error.response.data);
        }
    }
);




const airpotRateSlice = createSlice({
    name: 'airpotCityRates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirpotRates .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoundRates .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAirpotRates .fulfilled, (state, action) => {
                console.log(action);
                
                state.loading = false;
                state.airpotRates = action.payload.data;
            })
            .addCase(fetchRoundRates .fulfilled, (state, action) => {
                console.log(action);
                
                state.loading = false;
                state.roundRates = action.payload.data;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryList = action.payload.data;
            })
            .addCase(fetchAirpotRates .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRoundRates .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default airpotRateSlice.reducer;
