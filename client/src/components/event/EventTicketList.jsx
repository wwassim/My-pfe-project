import React from 'react'
import EventTicketCard from './EventTicketCard'


const EventList = ({event}) => {
  return (
    <>
    <h6 className='text-black-600 font-bold text-4xl text-left'>My Events</h6>
    <div className='flex flex-col pt-4'>
        <EventTicketCard event={event}/>        
    </div>
    </>
  )
}

export default EventList