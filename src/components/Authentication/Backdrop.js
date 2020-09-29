import React, { useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../../api';
import * as HOSTING_CONSTANTS from '../../constants/hosting';
import { UserContext } from '../User';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function AuthenticationBackdrop() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState(''); 
    const [loading, setLoading] = React.useState(false); 
    const userContext = React.useContext(UserContext); 
    
    useEffect(() => {
        authenticate(); 
    }, [])

    const authenticate = () => {
        setOpen(true)
        setLoading(true); 
        setMessage("Whitelisting...")

        //  Whitelist redirect URI
        api.authorize(HOSTING_CONSTANTS.DOMAIN)
        .then(function(response) {
            const data = response.data; 

            setMessage("Generating access token...")

            //  Generate access token
            return api.generateAccessToken(data.code, HOSTING_CONSTANTS.DOMAIN)
        })
        .then(function(response) {
            const data = response.data; 
            const accessToken = data.access_token; 

            setMessage("Getting user object...")

            //  Use access token to get user
            return api.getUser(accessToken)
        })
        .then(function(response) {
            const data = response.data; 

            //  Save user object in context so it's accessible in all other components
            userContext.setUser(data); 
        })
        .then(function() {
            setOpen(false); 
            setLoading(false); 
        })
        .catch(function(error) {
            setMessage("Error authenticating user. Please reload the page to authenticate.");
            setLoading(false); 
            console.log(error)
        }); 
    }

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                    {loading === true ? 
                        <Grid item>
                            <CircularProgress color="inherit" />
                        </Grid>
                        : null
                    }
                    <Grid item>
                        <Typography>
                            {message}
                        </Typography>
                    </Grid>
                </Grid>
            </Backdrop>
        </div>
    );
}