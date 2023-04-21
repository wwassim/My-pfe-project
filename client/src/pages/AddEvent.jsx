import useMediaQuery from "@mui/material/useMediaQuery";
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import Navbar from "../components/utility/NavBar";
import SidebarOrg from "../components/utility/SidebarOrg";
import AddEventForm from "../components/createevent/myorganization/AddEventForm";
import { fetchCategorys } from "../redux/categorySlice"; 



const Chat = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {categorys}=useSelector((state)=>state.categorys)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchCategorys())
  },[dispatch])
  
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <SidebarOrg/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             <AddEventForm categorys={categorys}/>
             </div>
         </div>
     </div>
  )
}

export default Chat