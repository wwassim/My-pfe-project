import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {category : null,categorys:[],loading:false,error:null};

//Get all categorys
export const fetchCategorys =createAsyncThunk("categorys/fetchCategorys",async(_, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get("categories")
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const categorySlice = createSlice({
    name:"categorys",
    initialState,
    reducers:{   cleanCategory:(state) => {state.category = null}},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategorys.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchCategorys.fulfilled,(state,action)=>{
            state.loading=false;
            state.categorys=action.payload;
        })
        .addCase(fetchCategorys.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})
export const {cleanCategory} = categorySlice.actions;
export default categorySlice.reducer;