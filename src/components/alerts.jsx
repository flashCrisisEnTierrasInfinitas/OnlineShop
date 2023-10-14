import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function Alerts({open,setOpen,data,color}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} className="conter-alerts">
            <Alert variant="filled" severity={color} onClose={handleClose} sx={{ width: '100%' }}>
                ¡{data}!!
            </Alert>
        </Snackbar>
    )
}