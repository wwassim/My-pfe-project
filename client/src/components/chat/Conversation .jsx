import React, {  useEffect, useRef, useState }  from 'react'
import { useDispatch, useSelector  } from "react-redux";
import {fetchUser} from '../../redux/userSlice'
import Loading from '../utility/Loading';
import axios from 'axios';

  
const Conversation  = ({conv,currentUser}) => {
    const dispatch = useDispatch()
    // const {error,loading, user } =  useSelector((state) => state.users)
     const [friendId, setUser] = useState(null);

    useEffect(() => {
        const friendId = conv.members.find((m) => m._id !== currentUser._id);
        setUser(friendId)   
        // dispatch(fetchUser(friendId))
        
      }, [currentUser, conv]);
      
      // useEffect(() => {
      //   const friendId = conv.members.find((m) => m !== currentUser._id);
      //   const getUser = async () => {
      //   const id =friendId
      //   try {
      //     const res = await axios.get(`/users/${id}`)
      //     setUser(res.data);
      //     } catch (error) {
      //         return console.log(error.message)
      //     }
      //   }
      //     getUser();
      // }, [currentUser, conv]);
     
  return (
    <>
    {/* <Loading error={error} loading={loading}> */}
      <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">       
                  <div className="w-1/4">
                    <img
                      src={friendId?.profileImg ?`http://localhost:5000/assets/${friendId?.profileImg}`:" https://cdn-icons-png.flaticon.com/512/147/147144.png"}
                      className="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-lg font-semibold">{friendId?.firstname}</div>
                    <span className="text-gray-500">{friendId?.lastname}</span>
                  </div>
      </div>
    {/* </Loading> */}
</>
  )
}

export default Conversation 