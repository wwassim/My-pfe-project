import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TelegramIcon from '@mui/icons-material/Telegram';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';


function SidebarOrg() {
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
            <NavLink to="/genaral" className={({isActive})=>isActive?"text-black-500":"text-gray-600"} end aria-label="Home" >
              <div  className="relative flex items-center space-x-4  px-4 py-3  ">
              <HomeIcon/>
              <span class="-mr-1 font-medium">Genaral</span>
              </div>
            </NavLink>
          </li>

          <li class="min-w-max">
          <NavLink to="/myorganazation" className={({isActive})=>isActive?"text-black-500":"text-gray-600"} aria-label="Tickets" >
            <div class="bg group flex items-center space-x-4 rounded-full px-4 py-3 ">
              <ConfirmationNumberIcon/>
              <span class="group-hover:text-gray-700">My organazation</span>
            </div>
          </NavLink>
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
          <NavLink to="/Analyse" className={({isActive})=>isActive?"text-black-500":"text-gray-600"} aria-label="Rank" >
            <div class="group flex items-center space-x-4 rounded-md px-4 py-3 ">
              <AutoAwesomeIcon/>
              <span class="group-hover:text-gray-700">Analyse</span>
            </div>
          </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
  
}
export default SidebarOrg