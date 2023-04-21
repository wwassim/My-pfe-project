import React from 'react'
import EventTicketList from '../components/event/EventTicketList';
import Navbar from '../components/utility/NavBar'
import Sidebar from '../components/utility/Sidebar';
import {useParams} from'react-router-dom'
import {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {fetchTicket} from '../redux/userSlice'
import Loading from '../components/utility/Loading';

const Myevents = () => {
  const dispatch=useDispatch();
  const {id}= useParams();
  const {loading,error,user}=useSelector((state)=>state.users)
  useEffect(() => {
    dispatch(fetchTicket(id));
   },[useDispatch])


  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
       <Sidebar/>
       <div className="flex flex-col flex-1">
				<Navbar />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
        <Loading loading={loading} error={error}>
              <EventTicketList event={user}/>
        </Loading>
				</div>
			</div>
    </div>
  )
}

export default Myevents