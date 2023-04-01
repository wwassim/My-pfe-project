import React, { useState,useEffect } from 'react'
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar';
import EventList from '../components/event/EventList';
import Category from '../components/category/Category';
import { useSelector ,useDispatch} from 'react-redux';
import Loading from '../components/utility/Loading'
import {fetchEvents} from "../redux/eventSlice"
import DatePicker from "react-horizontal-datepicker";

 const Home = () => {
    const {loading,error,events} = useSelector((state)=>state.events);
    const dispatch = useDispatch();
      useEffect(() => {
      dispatch(fetchEvents());
     },[useDispatch])
     const selectedDay = val => {
      console.log(val);
    };
 
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
       <Sidebar/>
       
       <div className="flex flex-col flex-1">
				<Navbar />
        

				<div className="flex-1 p-4 min-h-0 overflow-auto">
          <div className='max-w-[280px] sm:max-w-[720px] lg:max-w-[1240px] px-4  mx-auto'>
            <div className=""> 
              <DatePicker  getSelectedDay={selectedDay} labelFormat={"MMMM"} color={"#6D28D9"}/>
            </div>
          </div>

          <Category/>
          <Loading loading={loading} error={error}>
            <EventList events={events}/>
          </Loading>
				</div>
			</div>
    </div>
  );
};
export default Home