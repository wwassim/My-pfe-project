import React, { useEffect, useState } from 'react'
import StatBox from '../createevent/StatBox'
import { Box, Button,Typography} from "@mui/material";
import StairsIcon from '@mui/icons-material/Stairs';
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utility/Loading';

const Rankgrid = () => {
    const dispatch=useDispatch()
    const{loading,error ,users}=useSelector((state)=>state.users)
    const {user:currentUser}=useSelector((state)=>state.auth)
    const [sortedUsers, setSortedUsers] = useState([]);
    useEffect(()=>{
        dispatch(fetchUsers()) ;
    },[dispatch])
    
    useEffect(() => {
        // Sort users by point in descending order
        const sorted = [...users].sort((a, b) => b.point - a.point);
        setSortedUsers(sorted);
      }, [users]);

    // Find current user's rank
    let currentUserRank
    if(currentUser){
        currentUserRank  = sortedUsers.findIndex(user => user._id === currentUser._id) + 1;    
    }

    const columns=[
         {field: "index",headerName: "Rank",width: 100,renderCell: (params) => {const rowIndex = sortedUsers.findIndex(row => row === params.row); return <span>{rowIndex + 1}</span>; }},
         { field: "firstname", headerName: "first Name",cellClassName: "name-column--cell",},
         { field: "lastname", headerName: "Last Name", flex: 1,cellClassName: "name-column--cell",},
         { field: "participant", headerName: "Events", flex: 1,renderCell: (params) =>  <span>{params.row.participationEvent.length} </span>},
         { field: "point", headerName: "Billet Point", flex: 1,cellClassName: "name-column--cell",},
    
        ]
  return (
    <Box>
         <Loading loading={loading} error={error}>
            <Box className="bg-gray-300 flex items-center justify-center rounded-lg mb-5">
                   {currentUser&&(
                         <StatBox
                         title={`Current rank : ${ currentUserRank} | ${users.length}`}
                         subtitle="Rankings"
                         icon={< StairsIcon sx={{fontSize: "26px" }}/> 
                         }
                         />
                   )}  
            </Box>
            <Box className="col-span-8 row-span-2 bg-gray-300  rounded-lg">
                <Box className="flex justify-between items-center border-b-2 border-white bg-indigo-200 rounded-lg p-2">
                    <Typography 
                    color={"#141414"}
                    variant="h5" >
                        Ranking | General
                    </Typography>
                </Box>
                {/* Data grid */}
                <Box
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                        border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                        borderBottom: "none",
                        },
                        "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        },
                    }}
                    >
                    {/*   */}
                <DataGrid getRowId={(row) => row._id}  columns={columns} rows={sortedUsers}/>
                </Box>
            </Box>
         </Loading>
    </Box>
  )
}

export default Rankgrid