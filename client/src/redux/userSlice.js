import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const user = JSON.parse(localStorage.getItem('user'))// Get user from localStorage
const initialState = {user:user ? user : null,users:[],loading:false,error:null};

//Fetch user information
export const fetchUser =createAsyncThunk("users/fetchUser",async(id, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get(`/users/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Fetch all
export const fetchUsers =createAsyncThunk("users/fetchUsers",async(_, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get('/users')
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{   cleanUser:(state) => {state.user = null}},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        
    }
})

export const {cleanUser} = userSlice.actions;
export default userSlice.reducer;