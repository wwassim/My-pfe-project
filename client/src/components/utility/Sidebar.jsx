import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TelegramIcon from '@mui/icons-material/Telegram';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';


function Sidebar() {
  const { user } =  useSelector((state) => state.auth)
 
  
  return (

  <div class="sidebar min-h-[3.35rem] w-[3.35rem] lg:w-56 overflow-hidden border-r hover:bg-white hover:shadow-lg">
    <div class="flex h-screen flex-col justify-between pt-2 pb-6">
      <div>
      <NavLink to="/">
        <div class="w-max p-2.5">
          <h6 className='text-3xl font-bold'>Billet.tn</h6>
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
          {  user!== null&&(
          <NavLink to={`/${user._id}/myevent`} className={({isActive})=>isActive?"text-black-500":"text-gray-600"} aria-label="Tickets" >
            <div class="bg group flex items-center space-x-4 rounded-full px-4 py-3 ">
              <ConfirmationNumberIcon/>
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
    {  user!== null&&(
    <NavLink to={`/users/${user._id}`}>
    <div className="pt-2 px-2 flex justify-between border-t border-gray-300/40 dark:border-gray-700">
      <div className="w-max flex item-center gap-4">
        <img className="w-10 h-10 rounded-full" src='https://cdn-icons-png.flaticon.com/512/147/147144.png' alt='loading'/>
        <div>
          <h6 className="text-gray-600 font-medium dark:text-gray-200">{user.firstname}</h6>
          <span className="block -mt-0.5 text-xs text-gray-500">Profile</span>
        </div>
      </div>
      <DensityMediumIcon/>
    </div>
    </NavLink>
    )
    }
    </div>
  </div>
  )
  
}
export default Sidebar