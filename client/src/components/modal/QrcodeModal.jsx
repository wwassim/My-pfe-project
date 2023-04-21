import React, { useState } from 'react';
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography,} from '@material-ui/core';
import {Button}  from "@material-tailwind/react";
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ListFollower from './ListFollower';
import axios from "axios";
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    listItem: {
        backgroundColor: "#e0f2f1",
        marginBottom: theme.spacing(1),
        borderRadius: theme.spacing(1),
        width: '100%',
    },
    listItemText: {
        color: "#000000"
    },
    closeButton: {
        marginLeft: 'auto',
        backgroundColor: '#ffffff', // Set the desired background color here
        color: '#ff2400'
    },
    listItemSecondaryAction: {
        marginRight: theme.spacing(2)
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
    },

}));

const QrcodeModal = (props) => {
    const { title, openPopup, setOpenPopup,event} = props;
    const classes = useStyles(); 
    const {user}=useSelector((state)=>state.auth)

  const QrCodeDownload = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      const a = document.createElement("a");
    //    event name
      a.download = `${event} event.png`;
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };    

    return (
        <Dialog open={openPopup} maxWidth="md" fullWidth={true} classes={{ paper: classes.dialogWrapper, backgroundColor: "#141b2d", color: "#666666", }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Button
                        onClick={() => { setOpenPopup(false) }}
                        className={classes.closeButton}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
            <div className="container mx-auto w-[320px]">
                <div id="canvas" className="border p-2 relative">
                    <QRCodeCanvas
                    value={user._id}
                    size={300}
                    bgColor={"#ffffff"}
                    fgColor={"#0a75ad"}
                    level={"H"}
                    includeMargin={false}
                    />
                </div>
                <div className="flex w-[300px] mt-4 p-4 space-x-2 items-center justify-center">
                    <button
                    onClick={() => QrCodeDownload()}
                    class="flex items-center justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
                    >
                    <DownloadIcon />
                     Download
                    </button>
                </div>
             </div>
            </DialogContent>
        </Dialog>
    )
}

export default QrcodeModal;
