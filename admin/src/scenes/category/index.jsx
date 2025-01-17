import { useEffect ,useState,useCallback} from "react";
import { useSelector,useDispatch } from "react-redux"; 
import {  useNavigate } from "react-router-dom";
import { Box, Button,Typography, Avatar,useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import PopUp from "../../components/PopUp";
import {fetchCategorys,deleteCategory} from "../../redux/categorySlice"
import CategoryForm from "../../components/form/CategoryForm";

const Category = () => {
  const {categorys}=useSelector((state)=>state.categorys)
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false)
  const [itemId , setItempop] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateCounter, setUpdateCounter] = useState(0); 
  
    useEffect(()=>{
      dispatch(fetchCategorys())
    },[dispatch,updateCounter])
   ////////////////////////////////

  const deleteRecord = useCallback((id) => {dispatch(deleteCategory(id));setUpdateCounter((counter) => counter + 1);},[dispatch] )
  
  const deleteHandler =(item) =>{
    const id = item._id;
    if (window.confirm(`Do you really want to delete Category: ${item.name}?`)) {
      deleteRecord(id)
    }
  }
  useEffect(()=>{
    dispatch(fetchCategorys())
  },[dispatch])

  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID",flex:1, },
    { field: "picture", headerName: "Picture", width: 80,
    renderCell: (params) =><Avatar src={`http://localhost:5000/assets/${params.row.picture}`} />, 
    sortable: false,filterable: false, 
    },
    { field: "name", headerName: "Name", flex: 1,cellClassName: "name-column--cell",},
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
          <Header title="CATEGORYS" subtitle="Managing Categorys" />
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
        // m="40px 0 0 0"
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
          " .MuiDataGrid-exportButton": { // Add button styles here
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid   getRowId={(row) => row._id} rows={categorys} columns={columns} 
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
      <PopUp
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CategoryForm itemId={itemId} />
        </PopUp>

    </Box>
  );
};

export default Category;