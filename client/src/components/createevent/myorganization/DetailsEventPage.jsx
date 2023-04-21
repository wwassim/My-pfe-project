import React,{useEffect} from 'react'
import Navbar from '../../utility/NavBar'
import SidebarOrg from '../../utility/SidebarOrg'
import Loading from '../../utility/Loading'
import useEventDetails from '../../../Hooks/use-event-details'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from '../StatBox'
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { fetchParticipant } from '../../../redux/eventSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DetailsEventPage = () => {
  const {loading,error ,event}=useSelector((state)=>state.events)
  const dispatch=useDispatch();
  const {id}= useParams();
  const Rembou=3.4; //bich tetnaha k nzid remb lel model
  const RembLen=2; //bich tetnaha k nzid remb lel model
  useEffect(() => {
    dispatch(fetchParticipant(id));
   },[dispatch])
   console.log(event)
  const columns=[
    {field: "index",headerName: "Index",width: 100,
      renderCell: (params) => {
        const rowIndex = event.participant.findIndex(row => row === params.row);
        return <span>{rowIndex + 1}</span>;
      }
    },
    { field: "firstname", headerName: "first Name", flex: 1,cellClassName: "name-column--cell",},
    { field: "lastname", headerName: "Last Name", flex: 1,cellClassName: "name-column--cell",},
    { field: "email", headerName: "Email", flex: 1,cellClassName: "name-column--cell",},

  ]

  return (
     <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <SidebarOrg/>
    <div className="flex flex-col flex-1">
             <Navbar />
             <div className="flex-1 p-4 min-h-0 overflow-auto">
     <Loading loading={loading} error={error}>
     {event ? (
    <Box m="20px">                
        {/* ROW 1 */}
        <Box className='grid grid-cols-2 md:grid-cols-4 gap-6 py-6'>
          <Box className="bg-gray-300 flex items-center justify-center rounded-lg">
            <StatBox
              title={`DT ${(event.ticketsPrice*event.participant.length)+(Rembou*RembLen)}`}
              subtitle="Total Income"
              icon={< PointOfSaleIcon sx={{fontSize: "26px" }}/>
              }
            />
          </Box>
          <Box className="bg-gray-300 flex items-center justify-center rounded-lg">
            <StatBox
              title={`DT ${event.ticketsPrice*event.participant.length}`}
              subtitle="Sales Obtained"
              icon={< PaymentsIcon sx={{fontSize: "26px" }}/>
              }
            />
          </Box>
          <Box className="bg-gray-300 flex items-center justify-center rounded-lg">
            <StatBox
              title={`${event.participant.length}`}
              subtitle="Participant Number"
              icon={<PersonAddIcon sx={{ fontSize: "26px" }}/>}
            />
          </Box>
          <Box className="bg-gray-300 flex items-center justify-center rounded-lg">
            <StatBox
              title={`DT ${Rembou*RembLen}`}
              subtitle="refund Incom"           
              icon={<RequestQuoteIcon sx={{fontSize: "26px" }} />
              }
            />
          </Box>
        </Box>

         {/* ROW 2 */}
         <Box  className="grid grid-cols-12 gap-6">
          {/* Participant */}
            <Box className="col-span-8 row-span-2 bg-gray-300  rounded-lg">
              <Box className="flex justify-between items-center border-b-2 border-gray-900 bg-indigo-200 rounded-lg p-2">
                  <Typography 
                  color={"#141414"}
                  variant="h5" >
                    Participant List
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
               <DataGrid getRowId={(row) => row._id} checkboxSelection  columns={columns} rows={event?.participant}/>
              </Box>
            </Box>
          {/* Remborssement */}
            <Box className="col-span-4 row-span-2 bg-gray-300 overflow-auto rounded-lg">
              <Box className="flex justify-between items-center border-b-2 border-gray-900 bg-indigo-200 rounded-lg p-2">
                <Typography 
                color={"#141414"}
                variant="h5" >
                  refund
                </Typography>
              </Box>
              {/* {mockTransactions.map((transaction, i) => ( */}
              {/* key={`${transaction.txId}-${i}`} */}
              <Box className="flex justify-between items-center p-[15px] border-b-2 border-solid border-white ">
                  <Box>
                    <Typography>
                      wassim
                      {/* {transaction.user} */}
                    </Typography>
                  </Box>
                  <Box >
                    hhh
                  </Box>
                  <Box className=" bg-teal-400  p-1  rounded-md">
                    $20
                  </Box>
              </Box>
              {/*  ))} */}
            </Box>
         </Box> 
    </Box>
     ):(
        <>
           <p>Loading data</p>
        </>
     )}
   
     </Loading>
             </div>
         </div>
 </div>
  )
}

export default DetailsEventPage