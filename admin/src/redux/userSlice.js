import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))
// user ? user :
const initialState = {user: null,users:[],loading:false,error:null};

//Fetch All Users
export const fetchUsers =createAsyncThunk("users/fetchUsers",async(_, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get("users")
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

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
//Insert new user
export const insertUser =createAsyncThunk("users/insertUser",async(user,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    console.log(user)
    try {
        const res = await axios.post('auth/register',user)
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//update user
export const updateUser =createAsyncThunk("users/updateUser",async (item,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI;
    
    try {
      const res= await axios.put(`http://localhost:5000/users/${item._id}`,item,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       const data =  res.data
       return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//delete user
export const deleteUser =createAsyncThunk("users/deleteUser",async(id, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.delete(`http://localhost:5000/users/${id}`,{headers:{
            "content-type": "application/json;charset=utf-8",
           }})
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
        .addCase(insertUser.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(insertUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.users.push(action.payload)
        })
        .addCase(insertUser.rejected,(state)=>{
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
        .addCase(deleteUser.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=state.users.filter((el)=> el.id !== action.payload.id)
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})

export const {cleanUser} = userSlice.actions;
export default userSlice.reducer;