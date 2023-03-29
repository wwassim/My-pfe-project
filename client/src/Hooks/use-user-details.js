import {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {fetchUser}from "../redux/userSlice"
import {useParams} from'react-router-dom'


const useUserDetails = ()=>{
    const {id}= useParams();
    const {loading,error,user}=useSelector((state)=>state.users)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchUser(id))
    },[dispatch,id])
   
    return{loading,error,user}
}

export default useUserDetails