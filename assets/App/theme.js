import { createTheme } from "@mui/material";
import { blue, grey } from '@mui/material/colors';

const buttonContainedTheme = {
    color: '#262626',
    borderRadius: '8px',
    fontWeight: '700',
    lineHeight: '140%',
    letterSpacing: '0.3px',
    boxShadow: 'none',
    backgroundColor: '#FFCC00',
    border: '1px solid transparent',
    '&:hover': {
        backgroundColor: '#FAC000',
        borderColor: '#FAC000',
        boxShadow: 'none',
    }
}

const buttonOutlinedTheme = {
    color: '#262626',
    borderRadius: '8px',
    fontWeight: '700',
    lineHeight: '140%',
    letterSpacing: '0.3px',
    backgroundColor: 'transparent',
    border: '1px solid #FFCC00',
    '&:hover': {
        backgroundColor: '#FAC000',
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
        text: {
            primary: grey["900"],
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained", size: "medium" },
                    style: {
                        ...buttonContainedTheme,
                        fontSize: '14px',
                        padding: '8px 16px',
                    }
                },
                {
                    props: { variant: "outlined", size: "medium" },
                    style: {
                        ...buttonOutlinedTheme,
                        fontSize: '14px',
                        padding: '8px 16px',
                    }
                },
                {
                    props: { variant: "contained", size: "large" },
                    style: {
                        ...buttonContainedTheme,
                        fontSize: '16px',
                        padding: '16px 48px',
                    }
                },
                {
                    props: { variant: "outlined", size: "large" },
                    style: {
                        ...buttonOutlinedTheme,
                        fontSize: '16px',
                        padding: '16px 48px',
                    }
                },
            ]
        }
    }
});
