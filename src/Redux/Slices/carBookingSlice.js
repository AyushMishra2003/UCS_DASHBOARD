import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import axiosInstance1 from "../../Helper/axiosInstace1";

const initialState = {
    loading: false,
    error: null,
    bookings: [],
    bookingDetails: null,
};

// Async thunk for fetching all bookings
export const getCarBookings = createAsyncThunk('/carBookings', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get('/oneway/booking/allbooking');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

// Async thunk for fetching a single booking by ID
export const getCarBookingById = createAsyncThunk('/carBooking', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.get(`/oneway/booking/allbooking/${id}`);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

// Async thunk for approving a booking
export const approveBooking = createAsyncThunk('/approveBooking', async ({ id, adminId, driverDetails }, { rejectWithValue }) => {
    try {

         console.log(id);
         console.log(adminId);
         
         
        const res = await axiosInstance1.post(`/oneway/booking/book/confirm/${id}`, { adminId, driverDetails });
        toast.success('Booking approved successfully!');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

// Async thunk for completing a booking
export const completeBooking = createAsyncThunk('/completeBooking', async ({ id,extraRates}, { rejectWithValue }) => {
    try {
        const res = await axiosInstance1.post(`/oneway/booking/book/complete/${id}`,{extraRates});
        toast.success('Booking confirmed successfully!');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

// Async thunk for canceling a booking
export const cancelBooking = createAsyncThunk('/cancelBooking', async ({ id }, { rejectWithValue }) => {
    try {
        // oneway/booking/cancel/66c308777afdad6152233158
        console.log(id);

        
        const res = await axiosInstance1.post(`/oneway/booking/cancel/${id}`);
        toast.success('Booking canceled successfully!');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const addDriverDetails = createAsyncThunk('/driver/details', async ({ id ,driverDetails}, { rejectWithValue }) => {
    try {
        // oneway/booking/cancel/66c308777afdad6152233158
        console.log(id);

        console.log(driverDetails);
        

        
        const res = await axiosInstance1.put(`/oneway/booking/driver/${id}`,driverDetails);
        toast.success('Driver Updated  successfully!');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});

export const updateRate = createAsyncThunk('/update/extraTate', async ({ id ,extraRates}, { rejectWithValue }) => {
    try {
        // oneway/booking/cancel/66c308777afdad6152233158
        console.log(id);

        console.log(extraRates);
        

        
        const res = await axiosInstance1.put(`/oneway/booking/rate/${id}`, { extraRates });

        toast.success('Rates Updated  successfully!');
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
});


export const invoice = createAsyncThunk(
    '/booking/invoice',
    async (id, { rejectWithValue }) => {
      try {
        // Make the request expecting binary data
        const res = await axiosInstance1.get(`/invoice/${id}`, { responseType: 'arraybuffer' });
  
        toast.success('Invoice Downloaded Successfully');
        return res.data;  // This will be binary data
      } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
      }
    }
  );
  


const carBookingSlice = createSlice({
    name: "carBooking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getCarBookings
            .addCase(getCarBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCarBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.data;
            })
            .addCase(getCarBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch car bookings';
            })

            // Handle getCarBookingById
            .addCase(getCarBookingById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCarBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload.data;
            })
            .addCase(getCarBookingById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch car booking details';
            })

            // Handle approveBooking
            .addCase(approveBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(approveBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload.data;
            })
            .addCase(approveBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to approve booking';
            })

            // Handle completeBooking
            .addCase(completeBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload.data;
            })
            .addCase(completeBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to complete booking';
            })

            // Handle cancelBooking
            .addCase(cancelBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload.data;
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to cancel booking';
            });
    }
});

export default carBookingSlice.reducer;
