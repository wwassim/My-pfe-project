import React from 'react'
import EventTicketCard from './EventTicketCard'


const EventList = () => {
  return (
    <>
    <h6 className='text-black-600 font-bold text-4xl text-left'>My Events</h6>
    <div className='flex flex-col pt-4'>
        <EventTicketCard/>    
        <EventTicketCard/>    
        <EventTicketCard/>    
        <EventTicketCard/>    
    </div>
    </>
  )
}

export default EventList