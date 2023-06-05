import { useEffect ,useState,useCallback} from "react";
import { useSelector,useDispatch } from "react-redux"; 
import {  useNavigate } from "react-router-dom";
import { Box, Button,Typography, Avatar,useTheme } from "@mui/material";
import { DataGrid,GridToolbar  } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {fetchEvents,deleteEvent} from "../../redux/eventSlice"


const Event = () => {
    const {events}=useSelector((state)=>state.events)
    const theme = useTheme();
    const navigate = useNavigate();
      const dispatch = useDispatch();
      
      const [updateCounter, setUpdateCounter] = useState(0); 
      useEffect(()=>{
        dispatch(fetchEvents())
      },[dispatch,updateCounter])
     ////////////////////////////////
  
    const deleteRecord = useCallback((id) => {dispatch(deleteEvent(id));setUpdateCounter((counter) => counter + 1);},[dispatch] )
    
    const deleteHandler =(item) =>{
      const id = item._id;
      if (window.confirm(`Do you really want to delete event: ${item.eventTitle}?`)) {
        deleteRecord(id)
      }
    }
    useEffect(()=>{
        dispatch(fetchEvents())
    },[dispatch])
  
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "_id", headerName: "ID",flex:1, },
        // { field: "eventpicture",headerName: "Picture",width: 100,renderCell: (params) => (<img src={`http://localhost:5000/assets/${params.row.eventpicture}`} style={{ maxWidth: "100%", maxHeight: "100%" }}/>),sortable: false,filterable: false,},
        { field: "eventpicture",headerName: "Picture",width: 100,renderCell: (params) => (<Avatar src={`http://localhost:5000/assets/${params.row.eventpicture}`} variant="rounded" sx={{ width: 80}}/>),sortable: false,filterable: false,},
        { field: "eventTitle", headerName: "event Title", flex: 1,cellClassName: "name-column--cell",},
        { field: "creator",headerName: "Creator",flex: 1,cellClassName: "name-column--cell",renderCell: (params) => {return params.row.user.firstname;}},
        { field: "participant",headerName: "Participants",flex: 1,renderCell: (params) => (<span>{params.row.participant.length} </span>), sortable: false,filterable: false,flex: 1,},
        { field: 'actions',headerName: 'Actions',flex: 1,renderCell: (params) => {
          return (
            <Box sx={{ gap: 2 }} >
            <Button
              sx={{
                margin: "10px",
                backgroundColor: colors.greenAccent[500],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                border: 1,
              }}
              onClick={() => navigate(`${params.id}/edit`)}
            >
              Update
            </Button>
            <Button
            sx={{
              backgroundColor: colors.redAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              border: 1,
            }}
            onClick={()=>deleteHandler(params.row)}
          >
            Delete
          </Button>
          </Box>
          );
        },
      }
     
    ];
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="EVENTS" subtitle="Managing Events" />
        </Box>
        <Box
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiButtonBase-root": {
            color:  colors.primary[100],
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
         getRowId={(row) => row._id} columns={columns} rows={events}  
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true } ,
            printOptions:{hideFooter: true,hideToolbar: true,fileName:"Events List"},
            // printOptions: { disableToolbarButton: true } ,
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}/>
        </Box>
      </Box>
    );
  };
  

export default Event