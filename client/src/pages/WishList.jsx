import React, { useState } from 'react'
import {useSelector } from 'react-redux'
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar'
import Empty from '../components/wish/Empty'
import Full from '../components/wish/Full'

const WishList = () => {
    const {wishlistsItems}=useSelector((state) => state?.wishlists)
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
                {wishlistsItems?.length>0 ? <Full/>:<Empty/>}
             </div>
         </div>
     </div>
  )
}

export default WishList