import React from 'react'
import EventTicketList from '../components/event/EventTicketList';
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar';

const Myevents = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
       <Sidebar/>
       <div className="flex flex-col flex-1">
				<Navbar />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
                    <EventTicketList/>
				</div>
			</div>
    </div>
  )
}

export default Myevents