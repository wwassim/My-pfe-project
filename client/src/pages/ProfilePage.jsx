import React, { useState,useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "@mui/material";
import {IconButton,} from "@material-tailwind/react";
import TelegramIcon from '@mui/icons-material/Telegram';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { yellow } from '@mui/material/colors';
//
import {cleanUser,unfollowUser,followUser, likeUser} from '../redux/userSlice'
import useUserDetails from "../Hooks/use-user-details"
import Sidebar from '../components/utility/Sidebar';
import { useSelector } from 'react-redux';
import { fetchOrgEvents,cleanEvents } from "../redux/eventSlice";
import EventList from "../components/event/EventList";
import Follower from "../components/profile/Followers";
import Loading from "../components/utility/Loading";
import axios from "axios";


function UserProfilePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error,loading,user}=useUserDetails();
  const {user:currentUser}= useSelector((state) => state.auth)
  const {events}=useSelector((state) => state.events)
  const[data,setData]=useState()
  const [openPopup, setOpenPopup] = useState(false)//mtaa3 follower modal
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  
  
  useEffect(()=>{
    return()=>{
      dispatch(cleanUser())
    }
  },[dispatch])


  useEffect(()=>{
    dispatch(fetchOrgEvents(user?._id))
  },[dispatch,user])


  useEffect(()=>{
    if (currentUser && user) {
      // console.log(currentUser.followings)
    setLiked(user?.stars.includes(currentUser._id))
    setFollowed(user.followers.includes(currentUser?._id))
    
    }
    
  },[user,currentUser])

  
  const handleClick = async () => {
    const userId = currentUser?._id;
    if (followed) {
      dispatch(unfollowUser({ id: user._id, userId }));
      const updatedCurrentUser = { ...currentUser, followings: currentUser.followings.filter(f => f !== user._id) };
      localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
    } else {
      dispatch(followUser({ id: user._id, userId }));
      const updatedCurrentUser = { ...currentUser, followings: [...currentUser.followings, user._id] };
      localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
    }
    setFollowed(!followed);
  };

  const handleLike = () => {
    const userId = currentUser?._id;
    const id = user?._id;
    dispatch(likeUser({ userId, id }));
  };
  const addConversations = (data) => {
    console.log('temchi');
    axios
      .post("/conversations/", data)
      .then((res) => {
        // Perform additional logic or side effects
        navigate("/chat");
      })
      .catch((err) => {
        // Handle the error
        console.log(err);
      });
  };
  
  const handleConv = () => {
   
    if (currentUser !== null) {
      const data = { receiverId: user._id, senderId: currentUser._id };
      addConversations(data);
    }
  };
 console.log(user) 
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar/>
      <div className="flex flex-col flex-1">
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <div className="w-full p-10 mx-auto">
            <div className="w-max flex item-center gap-20 mb-7">
              <div className="h-full pl-5 flex" >
                <Avatar
                  style={{ width: "9rem", height: "22vh" }}
                  alt="Remy Sharp"
                  src={user?.profileImg ?`http://localhost:5000/assets/${user?.profileImg}`:" https://cdn-icons-png.flaticon.com/512/147/147144.png"}
                />
              </div>
              <div className="h-full col-span-2">
                <div className="w-70 flex item-center gap-x-4 mb-5">
                  <div className="text-lg">{user?.firstname}</div>
                  {currentUser?(
                    user?._id !== currentUser?._id ? (
                      <div className="flex gap-x-2">
                        <button className="w-90 h-10 font-bold mx-auto  rounded-lg p-2 bg-violet-700 text-white" onClick={()=>handleClick()} >
                        {followed ? "unfollow" : "follow"}                 
                        </button>
                        <IconButton className="flex items-center justify-center bg-violet-700 text-white" onClick={()=>handleConv()}>
                            <TelegramIcon />
                        </IconButton>
                     
                      </div>
                      ):(
                        <div className="flex gap-x-2">
                        <button className="w-90 h-10 font-bold flex mx-auto  rounded-lg p-2 bg-violet-700 text-white" onClick={()=>navigate("edit")}>Edit Profile</button>
                        </div>
                     )
                  ):(
                    <></>
                  )}
                </div>

                <div className="flex">
                 {currentUser&&
                  user?._id !== currentUser?._id ? (
                    liked?(
                      <div className="  space-x-2 bg-gray-300 text-white rounded-lg  text-center  mb-2 p-1 cursor-pointer" onClick={()=>handleLike()}> 
                        <StarIcon  className='mb-1' sx={{ color: yellow[700] }}/>
                        <span className="text-xl border-x-2 border-inherit px-1">starred</span>
                        <span className="bg-gray-400 text-white rounded-lg p-1">{user?.stars.length}</span> 
                      </div>
                    ):(
                     <div className="  space-x-2 bg-gray-300 text-white rounded-lg  text-center  mb-2 p-1 cursor-pointer" onClick={()=>handleLike()}> 
                      <StarOutlineIcon  className='mb-1' sx={{ color: yellow[700] }}/>
                      <span className="text-xl border-x-2 border-inherit px-1">star</span>
                      <span className="bg-gray-400 text-white rounded-lg p-1">{user?.stars.length}</span>
                    </div>
                    )
                  ):(
                    <div className="  space-x-2 bg-gray-300 text-white rounded-lg  text-center  mb-2 p-1"> 
                    <StarOutlineIcon  className='mb-1' sx={{ color: yellow[700] }}/>
                    <span className="text-xl border-x-2 border-inherit px-1">stars</span>
                    <span className="bg-gray-400 text-white rounded-lg p-1">{user?.stars.length}</span>
                  </div>
                  )}
                </div>     
                <div className="w-full flex item-center gap-x-4">
                  <div className="posts">
                    <strong>{events?.length}</strong> events
                  </div>
                  <div className="followers">
                    <strong>{user?.followers?.length}</strong> followers
                  </div>
                  <div className="following cursor-pointer" onClick={()=>{setOpenPopup(true)}}>
                    <strong>{user?.followings?.length}</strong> following
                  </div>
                </div>
                <div className="bio_wrapper">
                  <div className="profile_name">
                    <strong>{user?.firstname +'  '+user?.lastname }</strong>
                  </div>
                </div>   
              </div>
            </div>
            <hr />
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-5">
          {events.map((item) => (
              <div className="h-[200px] max-w-[300px]">
              <img className="h-full w-full rounded-lg" src={`http://localhost:5000/assets/${item.eventpicture}`} alt={item.eventTitle}/>
            </div>
          ))}
          </div>
          
        </div> 
      </div>
      
      <Follower
      title="Followers ..."
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      Data={user?.followings}
      isError={error}
      isLoading={loading}
      >
      </Follower>
   
    </div>
    
  );
}

export default UserProfilePage;




















