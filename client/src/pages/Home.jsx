import React from 'react'
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar';
import EventList from '../components/event/EventList';
import Category from '../components/category/Category';



 const Home = () => {
  
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
       <Sidebar/>
       <div className="flex flex-col flex-1">
				<Navbar />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
          <Category/>
          <EventList/>
				</div>
			</div>
    </div>
  );
};
export default Home