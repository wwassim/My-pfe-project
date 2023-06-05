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
    const dispatch= useDispatch()
    const [x, setEvent] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
      setEvent(events);
    }, [events]);

    useEffect(() => {
      dispatch(fetchEvents());
     },[useDispatch,events])
  
     const filter = (category,selectedDate)=>{
      if(category==="all"){
        return setEvent(events)
      }
      setEvent(
        events.filter((item)=> item.category===category || item.startDate.includes(selectedDate))
       )
     }
    const selectedDay = (val, category) => {
      setSelectedDate(val?.toLocaleDateString('en-US', { weekday: 'short' , day: '2-digit',month: 'short', year: 'numeric' }));
      filter(category, selectedDate)
    };
    
    
   

    
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
       <Sidebar/>
       
       <div className="flex flex-col flex-1">
				<Navbar events={x} setSearchResults={setEvent} allevent={events}/>
				<div className="flex-1 p-4 min-h-0 overflow-auto">
          <div className='max-w-[280px] sm:max-w-[720px] lg:max-w-[1240px] px-4  mx-auto'>
            <div className=""> 
              <DatePicker getSelectedDay={(val) => selectedDay(val, category)}  onChange={selectedDay} dateFormat="MMMM d, yyyy" color={"#6D28D9"}/>
            </div>
          </div>

          <Category filterCategory={filter}/>
          <Loading loading={loading} error={error}>
            <EventList events={x} loading={loading} error={error}/>
          </Loading>
				</div>
			</div>
    </div>
  );
};
export default Home