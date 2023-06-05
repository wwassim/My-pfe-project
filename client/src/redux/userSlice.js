import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import {setUserPhoto} from "./auth/authSlice"
// import { useDispatch } from "react-redux";

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
    const{rejectWithValue,dispatch } = thunkAPI;
    const id=item.get("_id")
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
      const res= await axios.put(`http://localhost:5000/users/${id}`,item,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       const data =  res.data
       dispatch(setUserPhoto(data.firstname))
       const currentUser=JSON.parse(localStorage.getItem("user"))
        currentUser.firstname=data.firstname
        currentUser.profileImg=data.profileImg
        localStorage.setItem("user",JSON.stringify(currentUser))
       return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//like User 
export const likeUser =createAsyncThunk("/users/likeUser",async(data, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    const id=data.id
    
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
       const res= await axios.put(`/users/${id}/like`,data,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    } 
})
//Remboursement
export const remboursement = createAsyncThunk("users/remboursement",async(data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    const id=data.id
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
        const res = await axios.put(`/users/${id}/rembouressement`,data,config,{headers:{
            "content-type": "application/json;charset=utf-8",
           }})
        return  res.data
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
        .addCase(likeUser.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(likeUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
        })
        .addCase(likeUser.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(remboursement.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(remboursement.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
        })
        .addCase(remboursement.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})

export const {cleanUser} = userSlice.actions;
export default userSlice.reducer;