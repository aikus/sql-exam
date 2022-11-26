import React from 'react';
import {IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const EnhancedTableToolbar = (props) => {
    const { title } = props;
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
            <Tooltip title="Re-check">
                <IconButton>
                    <PublishedWithChangesIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

export default EnhancedTableToolbar;