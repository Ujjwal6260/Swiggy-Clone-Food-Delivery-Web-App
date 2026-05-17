import {configureStore} from "@reduxjs/toolkit"
import LocationSliceReducer from "./LocationSlice"
import cacheSliceReducer from './CacheSlice'
import cartSlicerReducer from './CartSlice'


const store = configureStore({
    reducer:{
        location : LocationSliceReducer,
        cache : cacheSliceReducer,
        cart : cartSlicerReducer
    }
})

export default store