import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {fetchEvent}from "../redux/eventSlice"
import {useParams} from'react-router-dom'


const useEventDetails = ()=>{
    const {id}= useParams();
    const {loading,error,event}=useSelector((state)=>state.events)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchEvent(id))
    },[dispatch,id])
    return{loading,error,event}
}

export default useEventDetails