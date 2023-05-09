import React, { useRef } from 'react';
import { SyntaxHighlightingField } from "/assets/components/SyntaxHighlightingField";
import { Box, Button, Grid, Typography } from "@mui/material";

export const SqlAnswer = ({answer, setAnswer, handleExecution, finishButton}) => {

    const inputEl = useRef(null);

    return <>
        <SyntaxHighlightingField
            elementRef={inputEl}
            value={answer ?? ''}
            getValue={(value) => setAnswer(value)}
        />
        <Box>
            <Typography variant="body2">
                Введите SQL запрос и нажмите "Выполнить запрос", чтобы увидеть результат.
                Чтобы перейти к следующему заданию нажмите "Далее"
            </Typography>
        </Box>
        <Grid container sx={{mt: 4}} justifyContent={'space-between'}>
            <Grid item>
                <Button
                    variant='contained'
                    size='medium'
                    onClick={handleExecution}
                >
                    Выполнить запрос
                </Button>
            </Grid>
            <Grid item>
                {finishButton}
            </Grid>
        </Grid>
    </>;
}