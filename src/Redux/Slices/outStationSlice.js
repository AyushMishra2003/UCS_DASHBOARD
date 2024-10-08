import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

// Initial state setup
const initialState = {
    roundTripData: localStorage.getItem('roundTripData') !== "undefined" ? JSON.parse(localStorage.getItem('roundTripData')) : {},
    onewayTripData: localStorage.getItem('onewayTripData') !== "undefined" ? JSON.parse(localStorage.getItem('onewayTripData')) : {},
    roundCityData: localStorage.getItem('roundCityData') !== "undefined" ? JSON.parse(localStorage.getItem('roundCityData')) : {},
    onewayCityData: localStorage.getItem('onewayCityData') !== "undefined" ? JSON.parse(localStorage.getItem('onewayCityData')) : {},
    tcData: localStorage.getItem('tcData') !== "undefined" ? JSON.parse(localStorage.getItem('tcData')) : {},
};

// Thunks for different actions
export const getRoundCityData = createAsyncThunk('/outstation/roundCityData', async () => {
    try {
        let res = axiosInstance1.get('round/city');
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});


export const getRoundTripData = createAsyncThunk('/outstation/roundTripData', async () => {
    try {
        let res = axiosInstance1.get('round');
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const sendRoundTripData = createAsyncThunk('/outstation/roundTripData', async (data) => {
    try {
        let res = axiosInstance1.post('oneway/booking/trip/round', data);
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

export const getDistance = createAsyncThunk('/outstation/distance', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance1.post('distance', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});


export const getOnewayCityData = createAsyncThunk('/outstation/onewayCityData', async () => {
    try {
        let res = axiosInstance1.get('city/rate/allcity');
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const getOnewayCabData = createAsyncThunk('/outstation/onewayCabData', async (data) => {
    try {
        let res = axiosInstance1.post('city/rate/location/oneway', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const sendOnewayTripData = createAsyncThunk('/outstation/onewayBookingData', async (data) => {
    try {
        let res = axiosInstance1.post('oneway/booking/trip/oneway', data);
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

const outstationTripSlice = createSlice({
    name: 'outstationTrip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoundTripData.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem('roundTripData', JSON.stringify(action.payload.data));
                state.roundTripData = action.payload.data;
            })
            .addCase(getOnewayCabData.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem('onewayTripData', JSON.stringify(action.payload.data));
                state.onewayTripData = action.payload.data;
            })
            .addCase(getRoundCityData.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem('roundCityData', JSON.stringify(action.payload.data));
                state.roundCityData = action.payload.data;
            })
            .addCase(getOnewayCityData.fulfilled, (state, action) => {
                console.log(action)
                localStorage.setItem('onewayCityData', JSON.stringify(action.payload.data));
                state.onewayCityData = action.payload.data;
            })
            .addCase(getTCDetails.fulfilled, (state, action) => {
                localStorage.setItem('tcData', JSON.stringify(action.payload.data));
                state.tcData = action.payload.data;
            })

    }
});

export default outstationTripSlice.reducer;