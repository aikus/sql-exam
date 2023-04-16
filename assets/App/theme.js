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
    textTransform: 'none',
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
    textTransform: 'none',
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
                {
                    props: { variant: "outlined-alter", size: "medium" },
                    style: {
                        textTransform: "uppercase",
                        border: '1px solid #FFCC00',
                        '&:hover': {
                            backgroundColor: '#FAC00070',
                            boxShadow: 'none',
                        }
                    }
                },
                {
                    props: { variant: "contained-alter", size: "medium" },
                    style: {
                        textTransform: "uppercase",
                        backgroundColor: '#FFCC00',
                        '&:hover': {
                            backgroundColor: '#FAC000',
                            borderColor: '#FAC000',
                            boxShadow: 'none',
                        }
                    }
                },
            ]
        }
    }
});
