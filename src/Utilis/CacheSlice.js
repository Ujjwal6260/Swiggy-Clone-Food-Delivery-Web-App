import { createSlice } from "@reduxjs/toolkit";

const cacheSlice = createSlice({
    name : "cache",
    initialState : {},
    reducers :{
        addHomeData : (state, action) => {return{
            ...state,
            home : action.payload
        }},

        addDataById : (state,action) => {
            return {
                ...state,
                [`${action.payload.id}`] : action.payload.data
            }
        }
    }

})

export const {addHomeData, addDataById} = cacheSlice.actions
export default cacheSlice.reducer