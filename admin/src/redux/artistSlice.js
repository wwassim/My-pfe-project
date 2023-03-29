import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {artist : null,artists:[],loading:false,error:null};

//Get all artists
export const fetchArtists =createAsyncThunk("artists/fetchArtists",async(_, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get("artist")
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Get one artist
export const fetchArtist =createAsyncThunk("artists/fetchArtist",async(id, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get(`/artist/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Insert new artist
export const insertArtist =createAsyncThunk("artists/insertArtist",async(artist,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
        const res = await axios.post('/artist',artist,config)
       
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//update artist
export const updateArtist =createAsyncThunk("artists/updateArtist",async (item,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI;
     const id=item.get("_id")
     const config = {header: { "content-type": "multipart/form-data" }}
    try {
      const res= await axios.put(`http://localhost:5000/artist/${id}`,item,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       const data =  res.data
       return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//delete artist
export const deleteArtist =createAsyncThunk("artists/deleteArtist",async(id, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.delete(`http://localhost:5000/artist/${id}`,{headers:{
            "content-type": "application/json;charset=utf-8",
           }})
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})



const artistSlice = createSlice({
    name:"artists",
    initialState,
    reducers:{   cleanArtist:(state) => {state.artist = null}},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchArtist.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchArtist.fulfilled,(state,action)=>{
            state.loading=false;
            state.artist=action.payload;
        })
        .addCase(fetchArtist.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(fetchArtists.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchArtists.fulfilled,(state,action)=>{
            state.loading=false;
            state.artists=action.payload;
        })
        .addCase(fetchArtists.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(insertArtist.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(insertArtist.fulfilled,(state,action)=>{
            state.loading=false;
            state.artists.push(action.payload)
        })
        .addCase(insertArtist.rejected,(state)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(updateArtist.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(updateArtist.fulfilled,(state,action)=>{
            state.loading=false;
            state.artist  = action.payload;
        })
        .addCase(updateArtist.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(deleteArtist.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(deleteArtist.fulfilled,(state,action)=>{
            state.loading=false;
            state.artists=state.artists.filter((el)=> el.id !== action.payload.id)
        })
        .addCase(deleteArtist.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})
export const {cleanArtist} = artistSlice.actions;
export default artistSlice.reducer;