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
export const fetchEvent =createAsyncThunk("events/fetchEvent",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get(`/event/${id}`)
        return  res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//fetch Organisateur events
export const fetchOrgEvents =createAsyncThunk("events/fetchOrgEvents",async(info,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    const queryParams = {id:info};
    const config = {
        params:queryParams,
        header: { "content-type": "multipart/form-data" }}

    try {
        const res = await axios.get(`/event/organisateur`,config,{headers:{
            "content-type": "application/json;charset=utf-8",
           }})
        return  res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//buy a ticket 
export const getTicket = createAsyncThunk("events/getTicket",async(data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    const id=data.id
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
        const res = await axios.put(`/event/${id}/buy`,data,config,{headers:{
            "content-type": "application/json;charset=utf-8",
           }})
        return  res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

//Add event 
export const addEvent = createAsyncThunk("events/addEvent",async(data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
        const res = await axios.post(`/event`,data,config,)
        return res.data   
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Fetch participant event
export const fetchParticipant = createAsyncThunk("users/fetchParticipant",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get(`/event/${id}/participant`)
        return  res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Update event
//Delete event



const eventSlice= createSlice({
    name:'events',
    initialState,
    reducers:{   cleanEvent:(state) => {state.event = null},
    cleanEvents:(state) => {state.events = null}},
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
        .addCase(fetchEvent.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchEvent.fulfilled,(state,action)=>{
            state.loading=false;
            state.event=action.payload;
        })
        .addCase(fetchEvent.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(getTicket.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(getTicket.fulfilled,(state,action)=>{
            state.loading=false;
            state.event.participant.push(action.payload)
        })
        .addCase(getTicket.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(addEvent.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(addEvent.fulfilled,(state,action)=>{
            state.loading=false;
            state.events.push(action.payload)
        })
        .addCase(addEvent.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(fetchOrgEvents.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchOrgEvents.fulfilled,(state,action)=>{
            state.loading=false;
            state.events=action.payload;
        })
        .addCase(fetchOrgEvents.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(fetchParticipant.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchParticipant.fulfilled,(state,action)=>{
            state.loading=false;
            state.event=action.payload;
        })
        .addCase(fetchParticipant.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})

export const {cleanEvent,cleanEvents}=eventSlice.actions;
export default eventSlice.reducer;