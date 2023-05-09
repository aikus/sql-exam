import { createTheme } from "@mui/material";
import { blue, grey } from '@mui/material/colors';

const buttonContainedTheme = {
    color: '#262626',
    backgroundColor: '#FFCC00',
    '&:hover': {
        backgroundColor: '#FAC000',
        borderColor: '#FAC000',
    }
}

const buttonOutlinedTheme = {
    border: '1px solid #FFCC00',
    '&:hover': {
        backgroundColor: '#FAC00070',
        borderColor: '#FAC000'
    }
}

export const theme = createTheme({
    palette: {
        type: "maim",
        primary: {
            main: blue["700"],
        },
        secondary: {
            main: grey["900"],
        },
        appBar: {
            main: grey["50"],
        },
        text: {
            primary: grey["900"],
        }
    },
    typography: {
        button: {}
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained" },
                    style: {
                        ...buttonContainedTheme,
                    }
                },
                {
                    props: { variant: "outlined" },
                    style: {
                        ...buttonOutlinedTheme,
                    }
                }
            ]
        }
    }
});
