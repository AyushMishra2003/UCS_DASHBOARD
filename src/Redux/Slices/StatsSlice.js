import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from "sonner"
import axiosInstance from '../../Helper/axiosInstance'



const initialState = {
    totalUser: 0,
    totalBoater: 0,
    totalHotel: 0,
    totalGuider: 0,
    totalDriver: 0,
    totalPriest: 0,
    totalBoatBook: 0,
    totalHotelBook: 0,
    totalGuiderBook: 0,
    totalCarBook: 0,
    totalPriestBook: 0,
    monthlyRevenue: {},
    totalRevenue: 0,
    hotelPayments: 0,
    carPayments: 0,
    priestPayments: 0,
    boatPayments: 0,
    guiderPayments: 0
}

export const getStatsData = createAsyncThunk('/stats/get', async () => {
    try {
        const response = axiosInstance.get('/stats')
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

export const getBookingStatsData = createAsyncThunk('/booking/stats/get', async () => {
    try {
        const response = axiosInstance.get('/booking-stats')
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

export const getTotalMonthlyRevenue = createAsyncThunk('/admin/stats/payment-monthly', async () => {
    try {
        const response = axiosInstance.get('/payments')
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

export const getOrderRevenue = createAsyncThunk('/admin/stats/payment-orders', async () => {
    try {
        const response = axiosInstance.get('/order-payment')
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            console.log(action)
            state.totalBoater = action?.payload?.totalBoater
            state.totalDriver = action?.payload?.totalDriver
            state.totalGuider = action?.payload?.totalGuider
            state.totalHotel = action?.payload?.totalHotel
            state.totalPriest = action?.payload?.totalPriest
            state.totalUser = action?.payload?.totalUser
        }).addCase(getBookingStatsData.fulfilled, (state, action) => {
            state.totalBoatBook = action?.payload?.totalBoatBook
            state.totalHotelBook = action?.payload?.totalHotelBook
            state.totalGuiderBook = action?.payload?.totalGuiderBook
            state.totalCarBook = action?.payload?.totalCarBook
            state.totalPriestBook = action?.payload?.totalPriestBook
        }).addCase(getTotalMonthlyRevenue.fulfilled, (state, action) => {
            state.monthlyRevenue = action?.payload?.monthlyPayments
            state.totalRevenue = action?.payload?.allPayments
        }).addCase(getOrderRevenue.fulfilled, (state, action) => {
            state.hotelPayments = action?.payload?.hotelPayments
            state.carPayments = action?.payload?.carPayments
            state.priestPayments = action?.payload?.priestPayments
            state.boatPayments = action?.payload?.boatPayments
            state.guiderPayments = action?.payload?.guiderPayments
        })
    }
})

export default statsSlice.reducer