import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance1 from '../../Helper/axiosInstace1'; // Update the path as needed
import { toast } from 'sonner';

const initialState = {
    loading: false,
    error: null,
    rates: [],
    allrates:[],
    roundCity:[]
};

// Async thunks
export const fetchRates = createAsyncThunk(
    'cityRates/fetchRates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get('/city/rate');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchRoundCity = createAsyncThunk(
    'cityRates/fetchRiund',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.get('/round/city');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch rates');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addRate = createAsyncThunk(
    'cityRates/addRate',
    async (rateData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance1.post('/city/rate', rateData);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateRate = createAsyncThunk(
    'cityRates/updateRate',
    async (editRate, { rejectWithValue }) => {
        try {
            
            console.log(editRate);
            
            
            const response = await axiosInstance1.put(`/city/rate/category`, editRate);
            console.log(response);
            
            toast.success(response.data.message);

            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteRate = createAsyncThunk(
    'cityRates/deleteRate',
    async ({ fromCity, toCity, category }, { rejectWithValue }) => {
        try {
            console.log("delet rate ayush");
            const data={
                fromCity:fromCity,
                toCity:toCity,
                category:category
            }
            console.log(data);
            
            
            await axiosInstance1.delete(`/city/rate/category`, { data: { fromCity, toCity, category } });
            toast.success('Rate deleted successfully');
            return { fromCity, toCity, category };
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete rate');
            return rejectWithValue(error.response.data);
        }
    }
);

export const specificCityRate = createAsyncThunk(
    'cityRates/specific',
    async ({name,data}, { rejectWithValue }) => {
        try {
            console.log(name);
            console.log(data);
            
            
            
            const response=await axiosInstance1.post(`/chart/${name}`,data);
            toast.success('Rate Get successfully');
            return  response.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete rate');
            return rejectWithValue(error.response.data);
        }
    }
);

const cityRateSlice = createSlice({
    name: 'cityRates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoundCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRates.fulfilled, (state, action) => {
                state.loading = false;
                state.rates = action.payload.data;
            })
            .addCase(fetchRoundCity.fulfilled, (state, action) => {
                console.log(action);
                
                state.loading = false;
                state.roundCity = action.payload.data;
                console.log(state.roundCity);
                
            })
            .addCase(fetchRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRoundCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(specificCityRate.fulfilled, (state, action) => {
                state.loading = false;
                state.allrates = action.payload.data;
            })
      
    },
});

export default cityRateSlice.reducer;
