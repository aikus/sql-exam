import React, {useState} from 'react';
import {Box, CircularProgress, Grid, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CloseIcon from "@mui/icons-material/Close";

const EnhancedTableToolbar = (props) => {
    const { title, handleReCheck, closeReCheck } = props;

    const [loader, setLoader] = useState(false)
    const [reCheckSuccess, setReCheckSuccess] = useState(false)

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {title}
            </Typography>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Tooltip title="Re-check">
                    {
                        reCheckSuccess
                            ? <IconButton onClick={() => {closeReCheck(setReCheckSuccess)}}>
                                <CloseIcon />
                            </IconButton>
                            : <IconButton onClick={() => {handleReCheck(loader, setLoader, setReCheckSuccess)}}>
                                <PublishedWithChangesIcon color={"primary"} />
                            </IconButton>
                    }
                </Tooltip>
                {loader && (
                    <CircularProgress
                        size={40}
                        sx={{
                            color: 'primary',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Toolbar>
    )
}

export default EnhancedTableToolbar;