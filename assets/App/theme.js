import { createTheme } from "@mui/material";
import { yellow, grey, brown } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        type: "maim",
        primary: {
            main: yellow["600"],
        },
        secondary: {
            main: brown["600"],
        },
        text: {
            primary: grey["900"],
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                color: "var(--text-color-primary)",
                borderColor: "var(--button-color) !important",
                '&:hover': {
                    borderColor: "var(--hover-button-color) !important",
                },
            },
        },
    }
});
