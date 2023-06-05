import { useEffect ,useState,useCallback} from "react";
import { useSelector,useDispatch } from "react-redux"; 
import { Box, Button,Typography, useTheme,Avatar } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Form from "../../components/form/Form"
import {fetchUsers,updateUser} from "../../redux/userSlice"

const Organisateur= () =>{
    const {users}=useSelector((state)=>state.users)
    const theme = useTheme();
    const [openPopup, setOpenPopup] = useState(false)
    const [itemId , setItempop] = useState(null)
    const [isupdate, setIsUpdate] = useState(false)
    const [organisateurs, setOrganisateurs] = useState([]);
    // const navigate = useNavigate();
    const dispatch = useDispatch();
   
    useEffect(()=>{
      dispatch(fetchUsers())
    },[dispatch,users])
  
    useEffect(() => {
        const filteredOrganisateurs = users.filter(
          (organisateur) =>
            organisateur.phonenumber !== "" &&
            organisateur.acceptaion === "" &&
            organisateur.isAdmin === false
        );
        setOrganisateurs(filteredOrganisateurs);
      }, [users]);

    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "_id", headerName: "ID",flex:1, },
      { field: "firstname", headerName: "First Name",cellClassName: "name-column--cell",},
      { field: "lastname",  headerName: "Last Name",cellClassName: "name-column--cell",},
      { field: "frontcin",headerName: "Picture",width: 100,renderCell: (params) => (<Avatar src={`http://localhost:5000/assets/${params.row.frontcin}`} variant="rounded" sx={{ width: 80}}/>),sortable: false,filterable: false,},
      { field: "backcin",headerName: "Picture",width: 100,renderCell: (params) => (<Avatar src={`http://localhost:5000/assets/${params.row.backcin}`} variant="rounded" sx={{ width: 80}}/>),sortable: false,filterable: false,},
      {field: "email",headerName: "Email", flex: 1,},
      {field: 'actions',headerName: 'Actions',flex: 1,renderCell: (params) => {
        const handleAccept = (acceptaion) => {
            // console.log({ _id: params.id, acceptaion:"accept" })
            dispatch(updateUser({  _id: params.id, acceptaion:acceptaion}));
          };
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
              onClick={() =>handleAccept("accept")}
            >
             Accept
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
            onClick={() =>handleAccept("refuse")}
          >
           Refuse
          </Button>
          </Box>
          );
        },
      }
     
    ];
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="USERS" subtitle="Managing the Users Members" />
        <Box>
          
        </Box>
      </Box>
      <Box
        // m="20px 0 0 0"
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
        <DataGrid checkboxSelection  getRowId={(row) => row._id} rows={organisateurs} columns={columns}
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
           }} />
      </Box>
      
    </Box>
  )
}

export default Organisateur