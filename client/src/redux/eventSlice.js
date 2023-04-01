import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState ={events:[],event : null,loading:false,error:null}

//Fetch events
export const fetchEvents =createAsyncThunk("events/fetchEvents",async(_,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get('event')
        return  res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
}) 
//fetch single event
//Add event 
//Update event
//Delete event



const eventSlice= createSlice({
    name:'events',
    initialState,
    reducers:{   cleanEvent:(state) => {state.event = null}},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchEvents.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchEvents.fulfilled,(state,action)=>{
            state.loading=false;
            state.events=action.payload;
        })
        .addCase(fetchEvents.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})

export const {cleanEvent}=eventSlice.actions;
export default eventSlice.reducer;