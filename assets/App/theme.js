import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        appButton: {
            borderColor: "var(--button-color)",
            color: "var(--text-color-primary)",
        },
    }
});
