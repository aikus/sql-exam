import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => {
    return {
        button: { ...theme.components.appButton }
    };
});

export default useStyles;