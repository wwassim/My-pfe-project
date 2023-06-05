import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {IconButton,} from "@material-tailwind/react";
import ImageSlider from './eventcomponent/ImageSlider'
import 'react-slideshow-image/dist/styles.css'
import Description from './eventcomponent/Description'
import RightComp from './eventcomponent/RightComp';
import Loading from '../utility/Loading';
import { Avatar } from "@mui/material";
import { FacebookShareButton,  WhatsappShareButton,LinkedinShareButton,TwitterShareButton,FacebookMessengerShareButton,  WhatsappIcon,  FacebookIcon,FacebookMessengerIcon,LinkedinIcon,TwitterIcon,} from 'react-share';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import TelegramIcon from '@mui/icons-material/Telegram';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { likeUser } from '../../redux/userSlice';
////////////////////
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import LeafletGeocoder from '../../pages/LeafletGeocoder'; 


const EventDetails = ({event,loading,error}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shareUrl = `http://localhost:3000/events/${event._id}`;
  const { user:current } =  useSelector((state) => state.auth)
  const position = [36.8065, 10.1815];
  
  const handleConv = ()=>{
    if(current !== null){
      const data = {receiverId:event.user._id ,senderId:current._id}
      const addConversations = () => {
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
    }
  }
 
 
 

  return (
        <div className='h-screen   flex flex-col md:flex-row'>
            <div className='md:w-full md:h-full text-white text-center md:flex-grow grid grid-rows-5 grid-flow-col gap-4 mx-2 '>
                <div className=" w-full bg-center bg-cover  slide-container row-span-2 col-span-2 rounded-xl mt-2">
                    <ImageSlider image={event?.eventpicture}/>
                </div>              
                <div className='col-auto h-auto  text-black'>
                    <h6 className=' text-black-600 font-bold text-4xl text-left'>About</h6>
                    <Description description={event?.description}/>
                </div>
            </div>
            {/* Right event details */}
            <div className=' text-white text-center md:flex-shrink'>
                 <div className="mb-5  rounded-xl  bg-white text-black mt-2 text-center">
                    <RightComp event={event}  loading={loading} error={error} lassName="w-full h-full object-cover"/>
                 </div>
                 {/* Profile */}

                    <div className="mb-5 p-3 w-full  rounded-xl bg-white text-black  text-center  flex justify-between">
                      <div class="w-max flex item-center gap-4">
                        {event?.user?.profileImg  ?(
                          <Avatar
                            style={{ width: "40px", height: "40px" }}
                            alt="Remy Sharp"
                            src={ `http://localhost:5000/assets/${event?.user?.profileImg}`}
                          />
                        ):(
                          <Avatar
                              style={{ width: "40px", height: "40px" }}
                              alt="Remy Sharp"
                              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                            />
                        )}
                        <div>
                            <h6 className="text-gray-600 font-medium dark:text-gray-200">{event?.user?.firstname}</h6>
                              <span className="block -mt-0.5 text-xs text-gray-500">Organisateur</span>                           
                        </div>
                      </div>
                      {current &&(
                          <IconButton className="flex items-center justify-center bg-violet-700 text-white" onClick={()=>handleConv()}>
                           <TelegramIcon />
                         </IconButton>
                      )}
                     
                    </div>
                
                {/* Partage */}
                <div className="mb-5 col-span-2 rounded-xl bg-white text-black ">
                   <div className='p-2 flex item-center gap-4'>
                        <div className='mt-1 flex justify-between gap-6'>
                            <FacebookShareButton url={shareUrl}><FacebookIcon size={40} round={true} /></FacebookShareButton>
                            <FacebookMessengerShareButton url={shareUrl} ><FacebookMessengerIcon size={40} round={true} /></FacebookMessengerShareButton>                                                   
                            <WhatsappShareButton url={shareUrl} ><WhatsappIcon size={40} round={true} /></WhatsappShareButton>                                                   
                            <LinkedinShareButton url={shareUrl} ><LinkedinIcon size={40} round={true} /></LinkedinShareButton>                                                   
                            <TwitterShareButton url={shareUrl} ><TwitterIcon size={40} round={true} /></TwitterShareButton>                                                   
                        </div>
                   </div>
                </div>
                {/* Maps */}
                <div className="mb-5 h-auto col-span-3 rounded-xl bg-white text-black  text-center">
                    <div className='p-2'>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '300px'}}>
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LeafletGeocoder />
                        
                        </MapContainer>
                    </div>
                </div>
                
            </div>
        </div>

  
  )
}
let DefaultIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;
export default EventDetails