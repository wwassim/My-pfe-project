import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import io from "socket.io-client";
const socket = io("http://localhost:8900");

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
        // socket.emit("users", res.data); 
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
// follow user
export const followUser =createAsyncThunk("/users/followUser",async(data, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    const id=data.id
    
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
       const res= await axios.put(`/users/${id}/follow`,data,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    } 
})
// unfollow user
export const unfollowUser =createAsyncThunk("users/unfollowUser",async(data, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    const id=data.id
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
       const res= await axios.put(`/users/${id}/unfollow`,data,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    } 
})
//fetch all ticket event
export const fetchTicket = createAsyncThunk("users/fetchTicket",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get(`/users/${id}/myevent`)
        return  res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//update user

// export const updateUser =createAsyncThunk("users/updateUser",async (item,thunkAPI)=>{
//     const{rejectWithValue} = thunkAPI;
//      const id=item.get("_id")
//      const config = {header: { "content-type": "multipart/form-data" }}
//     try {
//       const res= await axios.put(`http://localhost:5000/users/${id}`,item,config,{headers:{
//         "content-type": "application/json;charset=utf-8",
//        }})
//        const data =  res.data
//        return data;
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// })
export const updateUser =createAsyncThunk("users/updateUser",async (item,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI;
    const id=item.get("_id")
    const config = {header: { "content-type": "multipart/form-data" }}
    console.log(item)
    try {
      const res= await axios.put(`http://localhost:5000/users/${id}`,item,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       const data =  res.data
       return data;
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
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(followUser.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(followUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user.followers.push(action.payload)
        })
        .addCase(followUser.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(unfollowUser.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(unfollowUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user.followers=state.user.followers.filter((followers) => followers !== action.payload)
        })
        .addCase(unfollowUser.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(fetchTicket.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchTicket.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        })
        .addCase(fetchTicket.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(updateUser.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user  = action.payload;
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})

export const {cleanUser} = userSlice.actions;
export default userSlice.reducer;