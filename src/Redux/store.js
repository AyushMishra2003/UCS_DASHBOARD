import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import listSliceReducer from './Slices/ListSlice'
import statsSliceReducer from './Slices/StatsSlice'
import authReducer from './Slices/LoginSlice';
import operatorReducer from './Slices/OperaotSlice'
import cityRateReducer from './Slices/cityRateSlice'
import carBookingReducer from './Slices/carBookingSlice'
import discountReducer from './Slices/discountSlice'
import localCityReducer from './Slices/LocalSlice'
import airpotRateReducer from './Slices/AirpotSlice'
import categorySliceReducer from './Slices/CategorySlice'
import localTripReducer from './Slices/localTripSlice'
import airportTripReducer from './Slices/airportSlice'
import outstationSlice from './Slices/outStationSlice'
import dynamicSlice from './Slices/dynamicSlice'
import packageSlice from './Slices/packageSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        list: listSliceReducer,
        stats: statsSliceReducer,
        auth1: authReducer,
        operator:operatorReducer,
        cityRates:cityRateReducer,
        carBooking:carBookingReducer,
        discounts:discountReducer,
        localCity:localCityReducer,
        airpot:airpotRateReducer,
        category:categorySliceReducer,
        localTrip: localTripReducer,
        airportTrip: airportTripReducer,
        outstation: outstationSlice,
        dynamic:dynamicSlice,
        package:packageSlice
    },
    devTools: true
})

export default store