import React from 'react'
import {useSelector  } from "react-redux"; 
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar';
import ChatDetails from '../components/chat/ChatDetails';
import SignFirst from '../components/utility/SignFirst';

const Chat = () => {
  const { user } =  useSelector((state) => state.auth)
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             {(user !== null)?(
              <ChatDetails user={user}/>
             ):(
              <SignFirst/>
             ) } 
             </div>
         </div>
     </div>
  )
}

export default Chat