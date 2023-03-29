import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
const Event = ({status}) => {
  const navigate = useNavigate();
  const [liked,setLiked] = useState(status)
  return (
    <div class="!z-5 shadow-3xl shadow-shadow-500 3xl:p-![18px] undefined relative flex flex w-full max-w-[300px] flex-col flex-col rounded-[20px] bg-white bg-white bg-clip-border !p-4">
      <div class="h-full w-full">
        
        <div class="mb-3 flex items-center justify-between px-1 md:items-start">
          <div>
            <p class="text-navy-700 text-sm font-bold">Abstract Colors</p>
            <p class="mt-1 text-xs font-medium text-gray-600 md:mt-2">By Esthera Jackson</p>
          </div>
          <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
             <PersonAddAltIcon/>
            {/* <button href="" class="linear bg-brand-900 hover:bg-brand-800 active:bg-brand-700 rounded-[20px] px-4 py-2 text-base font-medium text-white transition duration-200">+</button> */}
          </div>
        </div>

        <div class="relative w-full">
          <img onClick={()=>navigate("/event")} src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png" class="3xl:h-full 3xl:w-full mb-3 h-full w-full rounded-xl hover:cursor-pointer" alt="" />
          <button class="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer">
            <div class="flex h-full w-full items-center justify-center rounded-full text-xl ">
              {liked ?<FavoriteIcon sx={{ color: pink[500] }}  onClick={()=>{setLiked(false)}}/>:<FavoriteBorderIcon onClick={()=>{setLiked(true)}}/>}
           </div>
          </button>
          <div class="absolute bottom-3 right-3 inline-flex items-center rounded-xl bg-white p-1 shadow-md w-12">
            <div class='flex items-center px-2'>
             <div class='text-center'>
               <p class='text-gray-900 text-sm transition-all  group-hover:font-semibold duration-300'> Sat </p>
               <p class='text-gray-900  group-hover:font-bold transition-all	duration-300'> 17 </p>
            </div>
          </div>
           
    </div>
        </div>
        <div class="mb-3 flex items-center justify-between px-1 md:items-start">
          <div class="mb-2">
            <p class="text-navy-700 text-lg font-bold">Abstract Colors</p>
            <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">By Esthera Jackson</p>
          </div>
          <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
            <button href="" class="linear bg-brand-900 hover:bg-brand-800 active:bg-brand-700 rounded-[20px] px-4 py-2 text-base font-medium text-white transition duration-200">Place</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event