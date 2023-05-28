import { createTheme } from "@mui/material";
import { blue, grey } from '@mui/material/colors';

const buttonContainedPrimaryTheme = {
    color: '#262626',
    backgroundColor: '#FFCC00',
    '&:hover': {
        backgroundColor: '#FAC000',
    }
}

const buttonContainedSecondaryTheme = {
    color: '#262626',
    backgroundColor: '#FFF',
    border: '1px solid #FAC000',
    '&:hover': {
        backgroundColor: grey["200"],
    }
}

const buttonOutlinedTheme = {
    color: '#262626',
    border: '1px solid #FAC000',
    '&:hover': {
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
            main: grey["800"],
        },
        appBar: {
            main: grey["50"],
        },
        text: {
            primary: grey["900"],
        }
    },
    typography: {
        h1: {
            fontSize: '3.25rem',
        },
        h2: {
            fontSize: '2.5rem',
        },
        h3: {
            fontSize: '1.75rem',
        },
        button: {}
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained", color: 'primary' },
                    style: {
                        ...buttonContainedPrimaryTheme,
                    }
                },
                {
                    props: { variant: "contained", color: 'secondary' },
                    style: {
                        ...buttonContainedSecondaryTheme,
                    }
                },
                {
                    props: { variant: "outlined", color: 'primary' },
                    style: {
                        ...buttonOutlinedTheme,
                    }
                }
            ]
        }
    }
});
