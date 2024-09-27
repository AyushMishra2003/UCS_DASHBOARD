import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"
import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    driverList: localStorage.getItem('driverList') !== "undefined" ? JSON.parse(localStorage.getItem('driverList')) : [{}],
    carsBooking: localStorage.getItem('carsBooking') !== "undefined" ? JSON.parse(localStorage.getItem('carsBooking')) : [{}],
    boatBooking: localStorage.getItem('boatBooking') !== "undefined" ? JSON.parse(localStorage.getItem('boatBooking')) : [{}],
    priestBooking: localStorage.getItem('priestBooking') !== "undefined" ? JSON.parse(localStorage.getItem('priestBooking')) : [{}],
    guiderBooking: localStorage.getItem('guiderBooking') !== "undefined" ? JSON.parse(localStorage.getItem('guiderBooking')) : [{}],
    hotelBooking: localStorage.getItem('hotelBooking') !== "undefined" ? JSON.parse(localStorage.getItem('hotelBooking')) : [{}],
    userList: localStorage.getItem('userList') !== "undefined" ? JSON.parse(localStorage.getItem('userList')) : [{}],
    priestList: localStorage.getItem('priestList') !== "undefined" ? JSON.parse(localStorage.getItem('priestList')) : [{}],
    guiderList: localStorage.getItem('guiderList') !== "undefined" ? JSON.parse(localStorage.getItem('guiderList')) : [{}],
    hotelList: localStorage.getItem('hotelList') !== "undefined" ? JSON.parse(localStorage.getItem('hotelList')) : [{}],
    boatManList: localStorage.getItem('boatManList') !== "undefined" ? JSON.parse(localStorage.getItem('boatManList')) : [{}],
    driverDetail: localStorage.getItem('driverDetail') !== "undefined" ? JSON.parse(localStorage.getItem('driverDetail')) : {},
    boatmanDetail: localStorage.getItem('boatmanDetail') !== "undefined" ? JSON.parse(localStorage.getItem('boatmanDetail')) : {},
    priestDetail: localStorage.getItem('priestDetail') !== "undefined" ? JSON.parse(localStorage.getItem('priestDetail')) : {},
    guiderDetail: localStorage.getItem('guiderDetail') !== "undefined" ? JSON.parse(localStorage.getItem('guiderDetail')) : {},
    hotelDetail: localStorage.getItem('hotelDetail') !== "undefined" ? JSON.parse(localStorage.getItem('hotelDetail')) : {},
    singleCarData: localStorage.getItem('singleCarData') !== "undefined" ? JSON.parse(localStorage.getItem('singleCarData')) : {},
    singleBoatData: localStorage.getItem('singleBoatData') !== "undefined" ? JSON.parse(localStorage.getItem('singleBoatData')) : {},
    singlePriestData: localStorage.getItem('singlePriestData') !== "undefined" ? JSON.parse(localStorage.getItem('singlePriestData')) : {},
    singleGuiderData: localStorage.getItem('singleGuiderData') !== "undefined" ? JSON.parse(localStorage.getItem('singleGuiderData')) : {},
    singleHotelData: localStorage.getItem('singleHotelData') !== "undefined" ? JSON.parse(localStorage.getItem('singleHotelData')) : {},
}

export const getDriverList = createAsyncThunk('/admin/car/list', async (data) => {
    try {
        const params = new URLSearchParams(data).toString();
        let res = axiosInstance.get(`/car/list?${params}`);
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateDriverStatus = createAsyncThunk('/admin/car/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/car/update-status', data)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getDriverDetail = createAsyncThunk('/admin/car/detail', async (data) => {
    try {
        console.log(`/car/detail/${data}`)
        let res = axiosInstance.get(`/car/detail/${data}`)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }


})

export const getUsersList = createAsyncThunk('/admin/user/list', async (data) => {
    try {
        const params = new URLSearchParams(data).toString();
        let res = axiosInstance.get(`/user/list?${params}`);

        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message;
            },
            error: "Failed to load"
        });

        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message);
    }
});

export const getCarBookings = createAsyncThunk('/admin/car/booking', async () => {
    try {
        let res = axiosInstance.get('/car-orders')
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getCarOrderDetail = createAsyncThunk('/admin/car-book/:id', async (data) => {
    try {
        let res = axiosInstance.get(`car-orders/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getBoatmanList = createAsyncThunk('/admin/boat/list', async (data) => {
    try {
        const params = new URLSearchParams(data).toString();
        let res = axiosInstance.get(`/boat/list?${params}`);
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateBoatmanStatus = createAsyncThunk('/admin/boat/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/boat/update-status', data)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getBoatmanDetail = createAsyncThunk('/admin/boat/detail', async (data) => {
    try {
        console.log(`/boat/detail/${data}`)
        let res = axiosInstance.get(`/boat/detail/${data}`)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }


})

export const getBoatBookings = createAsyncThunk('/admin/boat/booking', async () => {
    try {
        let res = axiosInstance.get('/boat-orders')
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getBoatOrderDetail = createAsyncThunk('/admin/boat-book/:id', async (data) => {
    try {
        let res = axiosInstance.get(`boat-orders/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getPriestList = createAsyncThunk('/admin/priest/list', async (data) => {
    try {
        const params = new URLSearchParams(data).toString();
        let res = axiosInstance.get(`/priest/list?${params}`);
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updatePriestStatus = createAsyncThunk('/admin/priest/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/priest/update-status', data)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getPriestDetail = createAsyncThunk('/admin/priest/detail', async (data) => {
    try {
        let res = axiosInstance.get(`/priest/detail/${data}`)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }


})

export const getPriestBookings = createAsyncThunk('/admin/priest/booking', async () => {
    try {
        let res = axiosInstance.get('/priest-orders')
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getPriestOrderDetail = createAsyncThunk('/admin/priest-book/:id', async (data) => {
    try {
        let res = axiosInstance.get(`priest-orders/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getGuiderList = createAsyncThunk('/admin/guider/list', async (data) => {
    try {
        const params = new URLSearchParams(data).toString();
        let res = axiosInstance.get(`/guider/list?${params}`);
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateGuiderStatus = createAsyncThunk('/admin/guider/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/guider/update-status', data)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getGuiderDetail = createAsyncThunk('/admin/guider/detail', async (data) => {
    try {
        let res = axiosInstance.get(`/guider/detail/${data}`)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }


})

export const getGuiderBookings = createAsyncThunk('/admin/guider/booking', async () => {
    try {
        let res = axiosInstance.get('/guider-orders')
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getGuiderOrderDetail = createAsyncThunk('/admin/guider-book/:id', async (data) => {
    try {
        let res = axiosInstance.get(`guider-orders/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getHotelList = createAsyncThunk('/admin/hotel/list', async (data) => {
    try {
        const params = new URLSearchParams(data).toString();
        let res = axiosInstance.get(`/hotel/list?${params}`);
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateHotelStatus = createAsyncThunk('/admin/hotel/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/hotel/update-status', data)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getHotelDetail = createAsyncThunk('/admin/hotel/detail', async (data) => {
    try {
        let res = axiosInstance.get(`/hotel/detail/${data}`)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }


})

export const getHotelBookings = createAsyncThunk('/admin/hotel/booking', async () => {
    try {
        let res = axiosInstance.get('/hotel-orders')
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getHotelOrderDetail = createAsyncThunk('/admin/hotel-book/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`hotel-orders/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDriverList.fulfilled, (state, action) => {
            localStorage.setItem('driverList', JSON.stringify(action?.payload?.list))
            state.driverList = action?.payload?.list
        }).addCase(getDriverDetail.fulfilled, (state, action) => {
            localStorage.setItem('driverDetail', JSON.stringify(action?.payload?.detail))
            state.driverDetail = action?.payload?.detail
        }).addCase(getUsersList.fulfilled, (state, action) => {
            localStorage.setItem('userList', JSON.stringify(action?.payload?.list))
            state.userList = action?.payload?.list
        }).addCase(getCarBookings.fulfilled, (state, action) => {
            localStorage.setItem('carsBooking', JSON.stringify(action?.payload?.order))
            state.carsBooking = action?.payload?.order
        }).addCase(getCarOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleCarData', JSON.stringify(action?.payload?.order))
            state.singleCarData = action?.payload?.order
        }).addCase(getBoatmanList.fulfilled, (state, action) => {
            localStorage.setItem('boatManList', JSON.stringify(action?.payload?.list))
            state.boatManList = action?.payload?.list
        }).addCase(getBoatmanDetail.fulfilled, (state, action) => {
            localStorage.setItem('boatmanDetail', JSON.stringify(action?.payload?.detail))
            state.boatmanDetail = action?.payload?.detail
        }).addCase(getBoatBookings.fulfilled, (state, action) => {
            localStorage.setItem('boatBooking', JSON.stringify(action?.payload?.order))
            state.boatBooking = action?.payload?.order
        }).addCase(getBoatOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleBoatData', JSON.stringify(action?.payload?.order))
            state.singleBoatData = action?.payload?.order
        }).addCase(getPriestList.fulfilled, (state, action) => {
            localStorage.setItem('priestList', JSON.stringify(action?.payload?.list))
            state.priestList = action?.payload?.list
        }).addCase(getPriestDetail.fulfilled, (state, action) => {
            localStorage.setItem('priestDetail', JSON.stringify(action?.payload?.detail))
            state.priestDetail = action?.payload?.detail
        }).addCase(getPriestBookings.fulfilled, (state, action) => {
            localStorage.setItem('priestBooking', JSON.stringify(action?.payload?.order))
            state.priestBooking = action?.payload?.order
        }).addCase(getPriestOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singlePriestData', JSON.stringify(action?.payload?.order))
            state.singlePriestData = action?.payload?.order
        }).addCase(getGuiderList.fulfilled, (state, action) => {
            localStorage.setItem('guiderList', JSON.stringify(action?.payload?.list))
            state.guiderList = action?.payload?.list
        }).addCase(getGuiderDetail.fulfilled, (state, action) => {
            localStorage.setItem('guiderDetail', JSON.stringify(action?.payload?.detail))
            state.guiderDetail = action?.payload?.detail
        }).addCase(getGuiderBookings.fulfilled, (state, action) => {
            localStorage.setItem('guiderBooking', JSON.stringify(action?.payload?.order))
            state.guiderBooking = action?.payload?.order
        }).addCase(getGuiderOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleGuiderData', JSON.stringify(action?.payload?.order))
            state.singleGuiderData = action?.payload?.order
        }).addCase(getHotelList.fulfilled, (state, action) => {
            localStorage.setItem('hotelList', JSON.stringify(action?.payload?.list))
            state.hotelList = action?.payload?.list
        }).addCase(getHotelDetail.fulfilled, (state, action) => {
            localStorage.setItem('hotelDetail', JSON.stringify(action?.payload?.detail))
            state.hotelDetail = action?.payload?.detail
        }).addCase(getHotelBookings.fulfilled, (state, action) => {
            localStorage.setItem('hotelBooking', JSON.stringify(action?.payload?.order))
            state.hotelBooking = action?.payload?.order
        }).addCase(getHotelOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleHotelData', JSON.stringify(action?.payload?.order))
            state.singleHotelData = action?.payload?.order
        })
    }
})


export default listSlice.reducer