import { configureStore } from "@reduxjs/toolkit";
import users  from "./userSlice";
import categorys  from "./categorySlice";
import artists  from "./artistSlice";
const store =configureStore({
    reducer:{
        users,
        categorys,
        artists,
    }
})
export default store