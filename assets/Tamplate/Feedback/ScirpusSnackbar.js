import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const ScirpusSnackbar = ({message, clearMessage}) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        clearMessage()
        setOpen(false);
    };

    const action = <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {handleClose()}}
        >
            <CloseIcon fontSize="small" />
        </IconButton>

    return <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={action}
    />
}