import React from 'react'; 
import Button from '@material-ui/core/Button'; 
import * as ROUTES from '../../constants/routes'; 
import { useHistory } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function Landing() {
    const history = useHistory(); 
    const classes = useStyles(); 

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(ROUTES.CHECKOUT)}
            >
                Checkout
            </Button>
        </div>
    )
}