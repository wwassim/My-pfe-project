import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { addToWishList,removeWishlist  } from "../../redux/wishSlice"


const Event = ({status,item}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isWishListed = useSelector(
		(state) => state.wishlists.wishlistsItems.findIndex((rec) => rec._id === item._id) >= 0
	);
  const addToWishHandler = (item) => {
    dispatch(addToWishList(item)) 
  }
  const removeWishlishHandler = (item) => {
    dispatch(removeWishlist(item)); 
  }

 
    return (
      <div className="!z-5 shadow-3xl shadow-shadow-500 3xl:p-![18px] undefined relative flex flex w-full max-w-[300px] flex-col flex-col rounded-[20px] bg-white bg-white bg-clip-border !p-2">
      <div  className="h-full w-full">
        {/* organisateur info */}
        <div  className="w-max flex item-center gap-1">
          <img className="w-10 h-10 rounded-full" src='https://cdn-icons-png.flaticon.com/512/147/147144.png' alt='loading'/>
          <div  className="mb-1 items-center  px-1 md:items-start">
            {/* user Name */}
            <p className="text-navy-700 text-sm font-bold">{item?.user.firstname}</p>
            <p className="mt-1 text-xs font-medium text-gray-600 md:mt-2">By Esthera Jackson</p>
          </div>
        </div>
        {/* image and fav  */}
        <div className="relative w-full h-[200px]">
          <img onClick={()=>navigate(`/events/${item._id}`)} src={`http://localhost:5000/assets/${item.eventpicture}`}  className="3xl:h-[200px] 3xl:w-full mb-3 h-[200px] w-full rounded-xl hover:cursor-pointer" alt="" />
          {isWishListed ? (
              <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer " onClick={() => removeWishlishHandler(item)}>
                 <div class="flex h-full w-full items-center justify-center rounded-full text-xl ">
                <FavoriteIcon sx={{ color: pink[500] }}  />
                </div>
              </button>
              ) : (
              <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer" onClick={() => addToWishHandler(item)}>
                 <div class="flex h-full w-full items-center justify-center rounded-full text-xl ">
                  <FavoriteBorderIcon />
                </div>
              </button>
            )}
          <div class="absolute bottom-3 right-3 inline-flex items-center rounded-xl bg-white p-1 shadow-md w-12">
            <div class='flex items-center px-2'>
             <div class='text-center'>
               <p class='text-gray-900 text-sm transition-all  group-hover:font-semibold duration-300'>  {item?.startDate.split(',')[0]} </p>
               <p class='text-gray-900  group-hover:font-bold transition-all	duration-300'> {item?.startDate.split(',')[1].trim().match(/\d+/)[0]} </p>
            </div>
          </div>
           
          </div>
        </div>
        {/* fotter card */}
        <div class=" flex items-center justify-between px-1 md:items-start">
          <div class="mb-2">
            {/* Event title */}
            <p class="text-navy-700 text-lg font-bold">{item.eventTitle}</p>
            <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">{item.artist}</p>
          </div>
          <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
            <button href="" className="linear bg-violet-700 hover:bg-violet-700 active:bg-violet-700 rounded-[20px] px-4 py-2 my-3 text-base font-medium text-white transition duration-200">{item.ticketsPrice} DT</button>
          </div>
        </div>
  
      </div>
  
      </div>
  )
}

export default Event