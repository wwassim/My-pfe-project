import React,{useEffect,useCallback} from 'react';
import EventTicketCard from './EventTicketCard';
import {useParams} from'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {fetchUser,cleanUser,remboursement} from '../../redux/userSlice'
import Loading from '../utility/Loading';
const EventList = () => {
  const dispatch=useDispatch();
  const {id}= useParams();
  const {loading,error,user}=useSelector((state)=>state.users)

  const Rembou=useCallback(( userId, id )=>{
    dispatch(remboursement({userId, id}))
  },[dispatch])

  useEffect(()=>{
    dispatch(fetchUser(id))
  },[dispatch,id])

 

  return (
    <>
      <h6 className='text-black-600 font-bold text-4xl text-left'>My Events</h6>
      <div className='flex flex-col pt-4'>
        <Loading loading={loading} error={error}>
        {user?.participationEvent.length > 0 && (
      <>
       {user?.participationEvent.map((item, i) => (
      <>
        <EventTicketCard key={i} item={item} remboursement={Rembou} />
      </>
    ))}
  </>
)}

        </Loading>
      </div>
    </>
  );
};

export default EventList;
