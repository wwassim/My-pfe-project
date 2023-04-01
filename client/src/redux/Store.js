import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import users  from "./userSlice";
import events from "./eventSlice"
const store =configureStore({
    reducer:{
        users,
        auth,
        events,
    }
})
export default store