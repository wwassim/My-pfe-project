import React from 'react'
import {useEffect} from 'react'
import {useParams} from'react-router-dom'
import EventDetails from '../components/event/EventDetails'
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar'
import useEventDetails from "../Hooks/use-event-details"
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvent } from '../redux/eventSlice'

const Event = () => {

  const {loading,error,event}=useEventDetails()

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             {event ? (
            <EventDetails event={event} loading={loading} error={error} />
             ) : (
            // render alternative content or handle the case where event prop is not defined
            <p>Loading data</p>
            )}
             </div>
         </div>
    </div>
        
   
  )
}

export default Event