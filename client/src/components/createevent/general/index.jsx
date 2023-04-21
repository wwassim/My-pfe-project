import React from 'react'
import Navbar from '../../utility/NavBar'
import SidebarOrg from '../../utility/SidebarOrg';
import Form from './Form';


const General = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <SidebarOrg/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             <Form/>
             </div>
         </div>
     </div>
  )
}

export default General