import React from 'react';
import Avatar from '@mui/material/Avatar';
import avatarImg from "/assets/img/catAvatar.png";

export const ScirpusAvatar = () => {
    return <Avatar
        alt="Avatar"
        src={avatarImg}
        sx={{
            border: '1px solid var(--text-color-primary)',
            transition: '0.5s',
            '&:hover': {
                transform: 'rotate(360deg)'
            }
        }}
    />
}
