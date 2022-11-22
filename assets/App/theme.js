import { createTheme } from "@mui/material";
import { yellow, grey } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        type: "maim",
        primary: {
            main: yellow["600"],
        },
        secondary: {
            main: grey["900"],
        },
        text: {
            primary: grey["900"],
        }
    },
    overrides: {
        MuiButton: {
            outlinedPrimary: {
                color: "var(--text-color-primary)",
                borderColor: "var(--button-color)",
                '&:hover': {
                    borderColor: "var(--hover-button-color)",
                },
            },
        },
    }
});
