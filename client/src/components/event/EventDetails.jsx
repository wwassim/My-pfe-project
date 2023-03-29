import React from 'react'
import ImageSlider from './eventcomponent/ImageSlider'
import 'react-slideshow-image/dist/styles.css'
import Description from './eventcomponent/Description'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import {SlSocialFacebook,SlSocialInstagram} from 'react-icons/sl'
import {BsTiktok,}from 'react-icons/bs'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RightComp from './eventcomponent/RightComp';

const slideImages =[
    {url:"https://www.tekiano.com/wp-content/uploads/2019/11/marathon-comar-2019.jpg"  },
    {url:"https://www.outsideonline.com/wp-content/uploads/2022/01/BiwaAyumi-Miyashita1.jpg"},
    {url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBSEEED5m0HpmyvsGW6WG7onwOI6RPP5hG_9zBXtu1jIlkF8kOdb2RI2RElJcJjwcurLM&usqp=CAU"},
]

const EventDetails = () => {
  return (
    <div className='h-screen   flex flex-col md:flex-row'>
            <div className=' text-white text-center basis-3/4 grid grid-rows-5 grid-flow-col gap-4 mx-2 '>
                <div className=" w-full h-full bg-center bg-cover  slide-container row-span-2 col-span-2 rounded-xl mt-2">
                    <ImageSlider/>
                </div>
                <div className="col-span-2 rounded-xl bg-white text-black mb-2 text-center">
                    Category and Artist
                </div>               
                <div className='col-auto h-auto  text-black'>
                    <h6 className=' text-black-600 font-bold text-4xl text-left'>About</h6>
                    <Description/>
                </div>
              
            </div>
            {/* Right event details */}
            <div className='bg-red-800 text-white text-center  basis-1/4 '>
                 <div className="mb-5  rounded-xl  bg-white text-black mt-2 text-center">
                    <RightComp/>
                 </div>
                 {/* Profile */}

                    <div className="mb-5 p-3 w-full  rounded-xl bg-white text-black  text-center  flex justify-between">
                      <div class="w-max flex item-center gap-4">
                        <img className="w-10 h-10 rounded-full" src='https://cdn-icons-png.flaticon.com/512/147/147144.png' alt='loading'/>
                        <div>
                            <h6 className="text-gray-600 font-medium dark:text-gray-200">First name</h6>
                            <span className="block -mt-0.5 text-xs text-gray-500">Profile</span>
                        </div>
                      </div>
                      <div className="pt-1">
                        <PersonAddAltIcon/>
                      </div>
                    </div>
                
                {/* Partage */}
                <div className="mb-5 col-span-2 rounded-xl bg-white text-black ">
                   <div className='p-2 flex item-center gap-4'>
                        <p>Partage :</p>
                        <div className='mt-1 flex justify-between gap-8'>
                            <SlSocialFacebook/>
                            <SlSocialInstagram/>
                            <BsTiktok/>
                          
                        </div>
                   </div>
                </div>
                <div className="mb-5 col-span-2 rounded-xl bg-white text-black  text-center">
                    map
                </div>
            </div>
        </div>
  )
}

export default EventDetails