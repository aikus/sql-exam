import React from 'react';
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

export const BackToMainPageButton = () => {
  const navigate = useNavigate();

  return <Button
    onClick={() => navigate("/react/my-profile")}
    variant={'text'}
    color='info'
    size='S'
    startIcon={<KeyboardArrowLeftIcon />}
    sx={{mt: 2}}
  >
    Вернуться в личный кабинет
  </Button>

}