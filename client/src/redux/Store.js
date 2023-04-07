import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import users  from "./userSlice";
import events from "./eventSlice"
import wishlists from "./wishSlice"
const store =configureStore({
    reducer:{
        users,
        auth,
        events,
        wishlists,
    }
})
export default store