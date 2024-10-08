import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

// Initial state setup
const initialState = {
    cityData: localStorage.getItem('cityData') !== "undefined" ? JSON.parse(localStorage.getItem('cityData')) : {},
    tcData: localStorage.getItem('tcData') !== "undefined" ? JSON.parse(localStorage.getItem('tcData')) : {},
};

// Thunks for different actions
export const getLocalCityData = createAsyncThunk('/local/cityData', async () => {
    try {
        let res = axiosInstance1.get('local/getRate');
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const sendBookingData = createAsyncThunk('/local/cityData', async (data) => {
    try {
        let res = axiosInstance1.post('oneway/booking/trip/local', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const getTCDetails = createAsyncThunk('/tc/byTrip', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance1.post('tc/trip', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});


const localTripSlice = createSlice({
    name: 'localTrip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocalCityData.fulfilled, (state, action) => {
                localStorage.setItem('cityData', JSON.stringify(action.payload.data));
                state.cityData = action.payload.data;
            })
            .addCase(getTCDetails.fulfilled, (state, action) => {
                localStorage.setItem('tcData', JSON.stringify(action.payload.data));
                state.tcData = action.payload.data;
            })

    }
});

export default localTripSlice.reducer;