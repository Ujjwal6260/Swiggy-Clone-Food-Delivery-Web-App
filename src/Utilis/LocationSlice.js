import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getLocationThunk = createAsyncThunk("locationThunk", async() => {
    const Data = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                lat : position.coords.latitude,
                lon: position.coords.longitude
            })
        },
        (error) => {
            reject(error)
        })  
    })

    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${Data.lat}&lon=${Data.lon}&format=json`)
    const apiRes = await res.json()
    Data.location = apiRes.display_name

    return Data
})


const locationSlice = createSlice({
    name : "location",
    initialState : {
        loading : false,
        error : null,
        data : {}
    },

    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getLocationThunk.pending, (state, action) => {
            return{
                ...state,
                loading : true,
                
            }
        })
        .addCase(getLocationThunk.fulfilled,(state,action) => {
            return{
                ...state,
                loading: false,
                data : action.payload
            }
        })
        .addCase(getLocationThunk.rejected, (state, action) => {
            return{
                ...state,
                loading : false,
                error:action.payload
            }
        })
    }
})

export default locationSlice.reducer