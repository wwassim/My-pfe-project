import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TelegramIcon from '@mui/icons-material/Telegram';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { pink } from '@mui/material/colors';
import Follower from '../profile/Followers';

function Sidebar() {
  const dispatch= useDispatch()
  const {user:currentUser}= useSelector((state) => state.auth)
  const {error,loading,users}= useSelector((state) => state.users)
  const [openPopup, setOpenPopup] = useState(false)//mtaa3 follower modal
  
  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])


  return (

  <div class="sidebar min-h-[3.35rem] w-[3.35rem] lg:w-56 overflow-hidden border-r hover:bg-white hover:shadow-lg">
    <div class="flex h-screen flex-col justify-between pt-2 pb-6">
      <div>
      <NavLink to="/">
        <div class="w-max p-2.5">
          <h6 className='text-3xl font-bold'>Reservi</h6>
        </div>
      </NavLink>
        <ul class="mt-6 space-y-2 tracking-wide">

          <li className="min-w-max">
            <NavLink to="/" className={({isActive})=>isActive?"text-black-500":"text-gray-600"} end aria-label="Home" >
              <div  className="relative flex items-center space-x-4  px-4 py-3  ">
              <HomeIcon/>
              <span class="-mr-1 font-medium">Home</span>
              </div>
            </NavLink>
          </li>

          <li class="min-w-max">
          {  currentUser!== null&&(
          <NavLink to={`/myevent/${currentUser._id}`} className={({isActive})=>isActive?"text-black-500":"text-gray-600"} aria-label="Tickets" >
            <div class="bg group flex items-center space-x-4 rounded-full px-4 py-3 ">
             {currentUser?.participationEvent?.length>0 ? <ConfirmationNumberIcon sx={{ color: pink[500] }}/> :<ConfirmationNumberIcon/>}
              
              <span class="group-hover:text-gray-700">Tickets</span>
            </div>
          </NavLink>
           )
          }
          </li>

          <li class="min-w-max">
          <NavLink to="/chat" className={({isActive})=>isActive?"text-black-500":"text-gray-600"} aria-label="Chat" >
            <div class="group flex items-center space-x-4 rounded-md px-4 py-3 ">
              <TelegramIcon/>
              <span class="group-hover:text-gray-700">Chat</span>
            </div>
          </NavLink>
          </li>
          
          <li className="min-w-max cursor-pointer">
            <div
              className={`group flex items-center space-x-4 rounded-md px-4 py-3 ${
                openPopup ? 'text-black-500' : 'text-gray-600'
              }`}
              onClick={()=>{setOpenPopup(true)}}
            >
              <PersonAddIcon />
              <span className="group-hover:text-gray-700">Add friend</span>
            </div>
          </li>

          <li class="min-w-max">
          <NavLink to="/rank" className={({isActive})=>isActive?"text-black-500":"text-gray-600"} aria-label="Rank" >
            <div class="group flex items-center space-x-4 rounded-md px-4 py-3 ">
              <AutoAwesomeIcon/>
              <span class="group-hover:text-gray-700">Rank</span>
            </div>
          </NavLink>
          </li>

          <li class="min-w-max">
          <NavLink to="/addevent" className={({isActive})=>isActive?"text-black-500":"text-gray-600"}  aria-label="Add Event" >
            <div class="group flex items-center space-x-4 rounded-md px-4 py-3">
              <ControlPointIcon/>
              <span class="group-hover:text-gray-700">Add Event</span>
            </div>
          </NavLink>
          </li>
        </ul>
      </div>
      {/* Profile */}
    {  currentUser!== null&&(
      <NavLink to={`/users/${currentUser._id}`}>
      {/* <Loading error={error} loading={loading}> */}
    <div className="pt-2 px-2 flex justify-between border-t border-gray-300/40 dark:border-gray-700">
      <div className="w-max flex item-center gap-4">
              {currentUser?.profileImg ?(
                <Avatar
                  style={{ width: "40px", height: "40px" }}
                  alt="Remy Sharp"
                  src={ `http://localhost:5000/assets/${currentUser?.profileImg}`}
                />
              ):(
                <Avatar
                    style={{ width: "40px", height: "40px" }}
                    alt="Remy Sharp"
                    src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                  />
              )}
        <div>
          <h6 className="text-gray-600 font-medium dark:text-gray-200">{currentUser.firstname}</h6>
          <span className="block -mt-0.5 text-xs text-gray-500">Profile</span>
        </div>
      </div>
      <DensityMediumIcon/>
    </div>
    {/*    */}
    </NavLink>
    )
    }
    </div>
     <Follower
      title="USERS"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      Data={users}
      isError={error}
      isLoading={loading}
      >
      </Follower>
  </div>
  )
  
}
export default Sidebar