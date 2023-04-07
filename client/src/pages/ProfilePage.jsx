import React, { useState,useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "@mui/material";
//
import {cleanUser,unfollowUser,followUser} from '../redux/userSlice'
import useUserDetails from "../Hooks/use-user-details"
import Sidebar from '../components/utility/Sidebar';
import { useSelector } from 'react-redux';




function UserProfilePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user}=useUserDetails();
  const {user:currentUser}= useSelector((state) => state.auth)
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  //const isFriend = currentUser.followers.find((friend) => friend === user?._id)
  useEffect(()=>{
    return()=>{
      dispatch(cleanUser())
    }
  },[dispatch,currentUser])


  // useEffect(() => {
  //   if (currentUser&&user ) {
  //     setFollowed(currentUser.followings.includes(user?._id));
  //   }
  // }, [currentUser,user]);
  
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

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar/>
      <div className="flex flex-col flex-1">
          <div className="w-full p-10 mx-auto">

            <div className="w-max flex item-center gap-20 mb-7">
              <div className="h-full pl-5">
                <Avatar
                  style={{ width: "9rem", height: "22vh" }}
                  className="suggestion_user_avatar"
                  alt="Remy Sharp"
                  src=""
                />
              </div>
              <div className="h-full col-span-2">
                <div className="w-70 grid grid-cols-5 gap-x-4 mb-5">
                  <div className="text-lg w-full">{user?.firstname}</div>

                  <div className="text-center">
                  {user?._id !== currentUser?._id ? (
                    <button className="w-90 h-10 font-bold mx-auto  rounded-lg p-2 bg-violet-700 text-white" onClick={()=>handleClick()} >
                     {followed ? "unfollow" : "follow"}                 
                     </button>
                    ):(
                      <button className="w-90 h-10 font-bold mx-auto  rounded-lg p-2 bg-violet-700 text-white">Edit Profile</button>
                    )}
                  </div>
                  <div className="pl-2">
                    <svg
                      aria-label="Options"
                      class="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="8.635"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></circle>
                      <path
                        d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="w-full flex item-center gap-x-4">
                  <div className="posts">
                    <strong>11</strong> events
                  </div>
                  <div className="followers">
                    <strong>{user?.followers?.length}</strong> followers
                  </div>
                  <div className="following">
                    <strong>{user?.followings?.length}</strong> following
                  </div>
                </div>
                <div className="bio_wrapper">
                  <div className="profile_name">
                    <strong>{user?.firstname +'  '+user?.lastname }</strong>
                  </div>

                  <div>
                    👉Self Reliant 👈. 😎 👉Nature lover 👈 Visionary forever 🕵️ 👉I
                    cook pretty good 🤗wanna Taste 😋
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        
          <div className="w-70 mx-auto grid grid-cols-3 gap-4 md:gap-8 mt-20">
            {/* events */}
            </div>
      </div>
    </div>
    
  );
}

export default UserProfilePage;




















