import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import users  from "./userSlice";
const store =configureStore({
    reducer:{
        users,
        auth,
    }
})
export default store