import React from 'react'
import Event from './Event'

const EventList = () => {
  return (
    <>
    <h6 className='text-black-600 font-bold text-4xl text-left'>Events</h6>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
      
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    <Event status={false}/>
    </div>
    </>
  )
}

export default EventList