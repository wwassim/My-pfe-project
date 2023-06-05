import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, remboursement } from '../../redux/userSlice';
import { useNavigate } from "react-router-dom";

const RembModal = ({open,setOpen,eventId,userId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick =()=>{
     userId = userId;
    const id = eventId;
    dispatch(remboursement({ userId, id }))
    .unwrap()
    .then(() => navigate(`/myevent/${userId}`))
  }
  return (
    <>
    <Modal open={open} onClose={() => setOpen(false)}>
    <ModalDialog
      variant="outlined"
      role="alertdialog"
      aria-labelledby="alert-dialog-modal-title"
      aria-describedby="alert-dialog-modal-description"
    >
      <Typography
        id="alert-dialog-modal-title"
        component="h2"
        startDecorator={<WarningRoundedIcon />}
      >
        Confirmation
      </Typography>
      <Divider />
      <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
        Are you sure you want to Back your money
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="solid" color="danger" onClick={() => handleClick()}>
          Yes
        </Button>
      </Box>
    </ModalDialog>
  </Modal>
</>
  )
}

export default RembModal