import React from 'react'
import {useSelector } from 'react-redux'
import Event from '../event/Event'

const Full = () => {
  const {wishlistsItems}=useSelector((state) => state?.wishlists)
  return (
    <>
    <h6 className='text-black-600 font-bold text-4xl text-left'>Favorits Events</h6>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
    
      <Event status={true} events={wishlistsItems}/>
       
    </div>
    </>
  )
}

export default Full