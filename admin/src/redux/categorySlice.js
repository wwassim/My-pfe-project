import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {category : null,categorys:[],loading:false,error:null};

//Get all categorys
export const fetchCategorys =createAsyncThunk("categorys/fetchCategorys",async(_, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get("/categories")
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Get one category
export const fetchCategory =createAsyncThunk("categorys/fetchCategory",async(id, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.get(`/categories/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//Insert new category
export const insertCategory =createAsyncThunk("categorys/insertCategory",async(category,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    const config = {header: { "content-type": "multipart/form-data" }}
    try {
        const res = await axios.post('/categories',category,config)
       
        return res.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//update category
export const updateCategory =createAsyncThunk("categorys/updateCategory",async (item,thunkAPI)=>{
    const{rejectWithValue} = thunkAPI;
     const id=item.get("_id")
     const config = {header: { "content-type": "multipart/form-data" }}
    try {
      const res= await axios.put(`http://localhost:5000/categories/${id}`,item,config,{headers:{
        "content-type": "application/json;charset=utf-8",
       }})
       const data =  res.data
       return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
//delete category
export const deleteCategory =createAsyncThunk("categorys/deleteCategory",async(id, thunkAPI) => {
    const {rejectWithValue}=thunkAPI;
    try {
        const res = await axios.delete(`http://localhost:5000/categories/${id}`,{headers:{
            "content-type": "application/json;charset=utf-8",
           }})
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
        .addCase(fetchCategory.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(fetchCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.category=action.payload;
        })
        .addCase(fetchCategory.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
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
        .addCase(insertCategory.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(insertCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categorys.push(action.payload)
        })
        .addCase(insertCategory.rejected,(state)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(updateCategory.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.category  = action.payload;
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
        .addCase(deleteCategory.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categorys=state.categorys.filter((el)=> el.id !== action.payload.id)
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.loading =false;
            state.error=true;
        })
    }
})
export const {cleanCategory} = categorySlice.actions;
export default categorySlice.reducer;