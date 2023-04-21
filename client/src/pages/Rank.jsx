import React from 'react'
import Sidebar from '../components/utility/Sidebar'
import Navbar from '../components/utility/NavBar'
import Loading from '../components/utility/Loading'
import Rankgrid from '../components/rank/Rankgrid'

const Rank = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar/>
    <div className="flex flex-col flex-1">
             <Navbar/>
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             {/* loading={loading} error={error} */}
                <Loading >
                    <Rankgrid/>
                </Loading>
             </div>
         </div>
 </div>
  )
}

export default Rank