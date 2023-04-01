import React, { useState,useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';



const Event = ({status,events}) => {
  const navigate = useNavigate();
  const [liked,setLiked] = useState(status)
  

  
  const card =events.map((item,index)=>{
    return(<div class="!z-5 shadow-3xl shadow-shadow-500 3xl:p-![18px] undefined relative flex flex w-full max-w-[300px] flex-col flex-col rounded-[20px] bg-white bg-white bg-clip-border !p-4">
    <div key={item._id} class="h-full w-full">
      {/* organisateur info */}
      <div class="mb-3 flex items-center justify-between px-1 md:items-start">
        <div>
          {/* user Name */}
          <p class="text-navy-700 text-sm font-bold">{item.user.firstname}</p>
          <p class="mt-1 text-xs font-medium text-gray-600 md:mt-2">By Esthera Jackson</p>
        </div>
        <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
           <PersonAddAltIcon/>
          {/* <button href="" class="linear bg-brand-900 hover:bg-brand-800 active:bg-brand-700 rounded-[20px] px-4 py-2 text-base font-medium text-white transition duration-200">+</button> */}
        </div>
      </div>
      {/* image and fav  */}
      <div className="relative w-full h-[200px]">
        <img onClick={()=>navigate("/event")} src={`http://localhost:5000/assets/${item.eventpicture}`}  className="3xl:h-[200px] 3xl:w-full mb-3 h-[200px] w-full rounded-xl hover:cursor-pointer" alt="" />
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
      {/* fotter card */}
      <div class="mb-3 flex items-center justify-between px-1 md:items-start">
        <div class="mb-2">
          {/* Event title */}
          <p class="text-navy-700 text-lg font-bold">{item.eventTitle}</p>
          <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">{item.artist}</p>
        </div>
        <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
          <button href="" class="linear bg-violet-700 hover:bg-violet-700 active:bg-violet-700 rounded-[20px] px-4 py-2 text-base font-medium text-white transition duration-200">{item.ticketsPrice} DT</button>
        </div>
      </div>

    </div>

  </div>);
  })
    return (
    <>
      {card}
    </>
  )
}

export default Event