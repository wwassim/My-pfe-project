 import { useEffect ,useState,useCallback} from "react";
 import { useSelector,useDispatch } from "react-redux"; 
 import {  useNavigate } from "react-router-dom";
import { Box, Button,Typography, Avatar,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../Header";
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../../utility/NavBar'
import SidebarOrg from '../../utility/SidebarOrg';
import { fetchOrgEvents,cleanEvents } from "../../../redux/eventSlice";

const Myorganization = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {events}=useSelector((state) => state.events)
  const {user:currentUser}= useSelector((state) => state.auth)
  useEffect(()=>{
    dispatch(fetchOrgEvents(currentUser._id))
  },[dispatch])
  // useEffect(()=>{
  //   return()=>{
  //     dispatch(cleanEvents())
  //   }
  // },[dispatch])

  const columns = [ 
    { field: "_id", headerName: "ID",flex:1, },
    { field: "eventpicture", headerName: "Picture", width: 100, renderCell: (params) => <img  src={`http://localhost:5000/assets/${params.row.eventpicture}`}  className="max-w-full max-h-full w-auto h-auto"/>,  sortable: false,filterable: false,flex:1, },
    { field: "eventTitle", headerName: "event Title", flex: 1,cellClassName: "name-column--cell",},
    { field: "participant",headerName: "Participants",flex: 1,renderCell: (params) => (<span>{params.row.participant.length} </span>),
      sortable: false,
      filterable: false,
      flex: 1,
    },
    {field: 'actions',headerName: 'Actions',flex: 1,renderCell: (params) => {

      return (
        <Box sx={{ gap: 2 }} >
        <Button
          sx={{
            margin: "10px",
             backgroundColor:  "#4cceac",
            color: "#141414",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            border: 1,
          }}
          teal-400
          onClick={() => navigate(`${params.row._id}/details`)}
        >
          show
        </Button>
      </Box>
      );
    },
  }
  ];
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <SidebarOrg/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
             <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Events" subtitle="Managing Events" />
      <Box>
        <Button
          sx={{
            // backgroundColor: colors.blueAccent[700],
            // color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            border: 1,
             }}
             onClick={() => navigate(`/addevent`)} 
        >
            New event
          <AddIcon/>
        </Button>
      </Box>
    </Box>
    <Box className="col-span-8 row-span-2 bg-gray-300  rounded-lg">
      <Box
        className="rounded-lg"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color:"#2e7c67",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:"#a4a9fc",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor:"#f2f0f0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#a4a9fc",
          },
          "& .MuiCheckbox-root": {
            color: `"#1e5245" !important`,
          },
        }}
      >
        <DataGrid checkboxSelection getRowId={(row) => row._id} columns={columns} rows={events}/>
      </Box>
    </Box>

  </Box>
             </div>
         </div>
     </div>

  )
}

export default Myorganization