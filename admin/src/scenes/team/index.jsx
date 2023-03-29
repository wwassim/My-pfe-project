import { useEffect ,useState,useCallback} from "react";
import { useSelector,useDispatch } from "react-redux"; 
import {  useNavigate } from "react-router-dom";
import { Box, Button,Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import PopUp from "../../components/PopUp";
import Form from "../../components/form/Form"
import {fetchUsers,deleteUser} from "../../redux/userSlice"

const Team = () => {
  const {users}=useSelector((state)=>state.users)
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false)
  const [itemId , setItempop] = useState(null)
  const [isupdate, setIsUpdate] = useState(false)
  const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchUsers())
    },[dispatch])
   ////////////////////////////////

  const deleteRecord = useCallback((id) => {dispatch(deleteUser(id))},[] )
  
  const deleteHandler =(item) =>{
    console.log(item)
    const id = item._id;
    if (window.confirm(`Do you really want to delete User: ${item.firstname}?`)) {
      deleteRecord(id)
    }
  }
  useEffect(()=>{
    dispatch(fetchUsers())
  },[users,dispatch])

  const handleShow =(params)=>{
    setIsUpdate(true)
    setItempop(params.row)
    setOpenPopup(true)
  }
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID",flex:1, },
    { field: "firstname", headerName: "First Name", flex: 1,cellClassName: "name-column--cell",},
    { field: "lastname",  headerName: "Last Name",  flex: 1,cellClassName: "name-column--cell",},
    {field: "email",headerName: "Email", flex: 1,},
    {field: 'actions',headerName: 'Actions',flex: 1,renderCell: (params) => {
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
          <Header title="TEAM" subtitle="Managing the Team Members" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              border: 1,
            }}
            onClick={()=>{setOpenPopup(true)}}
          >
            <AddIcon/>
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
        <DataGrid checkboxSelection  getRowId={(row) => row._id} rows={users} columns={columns} />
      </Box>
      <PopUp
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Form itemId={itemId} isupdate={isupdate}/>
            </PopUp>
    </Box>
  );
};

export default Team;