import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const API_URL = '/auth/register'
const API_URL_LOGIN = '/auth/adminlogin'
// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError:false,
  isSuccess:false,
  isLoding:false, 
  message:''
};



//Login Admin
export const login   = createAsyncThunk( "auth/login", async (user, thunkAPI) => {
      try {
        const response = await axios.post(API_URL_LOGIN, user);
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      
          // Refresh the data in local storage
          const user = JSON.parse(localStorage.getItem('user'));
          const token = JSON.parse(localStorage.getItem('token'));
          localStorage.setItem('user', JSON.stringify({...user, accessToken: token}));
        }
         return response.data;
      } catch (error) {
        console.log(error)
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);

//logout  Admin
export const logout = createAsyncThunk('auth/logout', async () => {
  await  localStorage.removeItem('user')
})



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoding  = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
       
        },extraReducers:(builder)=>{
            builder
            .addCase(login.pending, (state) => {
              state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
              state.user = null
            })
            
            
        },
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;