import { useEffect, useState } from "react";
import {useDispatch,useSelector,} from "react-redux"
import Navbar from '../../utility/NavBar'
import SidebarOrg from '../../utility/SidebarOrg';
import Form from './Form';
import {fetchUser,} from '../../../redux/userSlice'
import Loading from "../../utility/Loading";
import { useNavigate } from "react-router-dom";


const General = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user}= useSelector((state) => state.auth)
  const {error,loading,user:currentUser}= useSelector((state) => state.users)

 useEffect(()=>{
  if (user !== null) {
    dispatch(fetchUser(user._id))
  }
},[dispatch,user])
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <SidebarOrg/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
              {user ?(
                <Loading loading={loading} error={error}>
                  <Form currentUser={currentUser}/>
                </Loading>
              ):(
                <div className="flex flex-col items-center justify-center h-screen">
                  <div className="text-3xl font-bold mb-2 text-center">
                    Sign in First
                  </div>
                  <img
                    src="/assets/signin.png"
                    alt="no account"
                    className="h-100 "
                  />
                  <button  onClick={()=>navigate("/auth")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      sign in
                  </button>
               </div>
              )}
             
             </div>
         </div>
     </div>
  )
}

export default General