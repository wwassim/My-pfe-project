import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from 'axios'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError:false,
  isSuccess:false,
  isLoding:false, 
  message:''
};

//Register user
export const register  = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
      
        try {
           return await authService.register(user)
           
        } catch (error) {
          //const message = (error.response.data && error.response&&error.response.data.message)|| error.message ||error.toString();
          // console.log(error.response.data); 
          return thunkAPI.rejectWithValue(error.response.data.errorMessage);
        }
    }
);

//Login user
export const login   = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
   
      try {
         return await authService.login(user)
      } catch (error) {
        console.log(error)
       // const message = (error.response.data && error.response&&error.response.data.message)|| error.message ||error.toString();
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);

//logout the user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

///
export const sendResetPasswordLink = createAsyncThunk("auth/sendResetPasswordLink",async(data,thunkAPI)=>{
  const {rejectWithValue}=thunkAPI;
  try {
    const response= await axios.post('/auth/reset-password-link',data)
  
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

// Validate reset password link
export const validateResetPasswordLink = createAsyncThunk('auth/validateResetPasswordLink', async (userId) => {
  try {
    const res = await axios.get(`/auth/reset-password/${userId}`)
    return res.data.message
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.errorMessage || 'Internal server error');
  }
})

// Reset password
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ id, password },thunkAPI) => {
  try {
    const response = await axios.post(`/auth/reset-password/${id}`, { password })
    return response.data
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
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
        setUserPhoto:(state,action)=>{
          state.user.firstname=action.payload
        },
        },extraReducers:(builder)=>{
            builder
            .addCase(register.pending, (state) => {
                state.isLoding = true;
            })
            .addCase(register.fulfilled, (state,action) => {
              state.isLoding = false
              state.isSuccess = true
              state.user = action.payload
            })
            .addCase(register.rejected, (state,action) => {
              state.isLoding = false
              state.isError = true
              state.message = action.payload
              state.user = null
            })
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
            .addCase(sendResetPasswordLink.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(sendResetPasswordLink.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.message = action.payload
              state.user = null
            })
            .addCase(sendResetPasswordLink.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.user = null
            })
            .addCase(resetPassword.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.message = action.payload
              state.user = null
            })
            .addCase(resetPassword.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
              state.user = null
            })
        },
})


export const { reset,setUserPhoto } = authSlice.actions;
export default authSlice.reducer;