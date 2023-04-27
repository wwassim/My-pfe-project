import { configureStore } from "@reduxjs/toolkit";
import users  from "./userSlice";
import categorys  from "./categorySlice";
import artists  from "./artistSlice";
import events from "./eventSlice";
const store =configureStore({
    reducer:{
        users,
        categorys,
        artists,
        events,
    }
})
export default store