import React, { useEffect, useState ,useRef } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { getTicket ,fetchEvent} from '../redux/eventSlice';

function SucessPayement() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams]=useSearchParams();
    const paymentId = searchParams.get('payment_id');
    const [result,setResult] = useState("");
    const [orderId,setOrderId] = useState("");
    const {user:currentUser}=useSelector((state)=>state.auth)
    const {event}=useSelector((state)=>state.events)
    const id = JSON.parse(localStorage.getItem('enevt'))
    const userId = JSON.parse(localStorage.getItem('userId'))
    const [participation,setParticipation]=useState(
      currentUser?.participationEvent.includes(event?._id)
    )
    const prevResultRef = useRef('');
    useEffect(()=>{
        dispatch(fetchEvent(id))
        axios.post(`/payment/${paymentId}`)
        .then((res)=>{
            setOrderId(res.data.result.details.order_number)
            setResult(res.data.result.status)
        })
        .catch((err)=>{console.error(err)});
    },[dispatch ,id, paymentId])
   
  

    useEffect(() => {
      
      if (result === 'SUCCESS' && prevResultRef.current !== 'SUCCESS') {
        
        if( userId === currentUser?._id){
          dispatch(getTicket({ id: event._id, userId }));
          if(participation === false){
                const updatedCurrentUser = {
            ...currentUser, 
              participationEvent: [...currentUser.participationEvent, event._id],
              point: currentUser.point + 10
            };
            localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
          }
        }else{
          dispatch(getTicket({ id: event._id, userId }));
          // if(participation === false){
          //       const updatedCurrentUser = {
          //   ...currentUser, 
          //     participationEvent: [...currentUser.participationEvent, event._id],
          //     point: currentUser.point + 10
          //   };
          //   localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
          // }
        }
      }
      prevResultRef.current = result;
    }, [result, event, currentUser, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold mb-8 text-center">
       Thank you for your order.
       <br/><br/>
       <p className='font-light'>Your order number is  "{orderId}"</p>
      </div>
      <img
        src="assets/Spayment.png"
        alt="Empty Wishlist"
        className="h-64 mb-8"
      />
      <button  onClick={()=>navigate("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue Shopping
      </button>
    </div>
  )
}

export default SucessPayement