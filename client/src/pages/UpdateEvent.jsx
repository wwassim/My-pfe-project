import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../components/utility/NavBar";
import SidebarOrg from "../components/utility/SidebarOrg";
import UpdateEventForm from "../components/createevent/myorganization/UpdateEventForm";

const UpdateEvent = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <SidebarOrg/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             <UpdateEventForm/>
             </div>
         </div>
     </div>
  )
}

export default UpdateEvent