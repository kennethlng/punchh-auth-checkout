import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from "react-router-dom";
import * as ROUTES from '../../constants/routes'; 
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    loginButton: {
        marginLeft: theme.spacing(2)
    },
    spacer: {
        flexGrow: 1,
    }
}));

export default function NavigationBar() {
    const classes = useStyles();
    const history = useHistory(); 

    const handleLogoClick = (e) => {
        e.preventDefault(); 
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        color="inherit"
                        edge="start"
                        href={ROUTES.HOME}
                        onClick={() => history.push(ROUTES.HOME)}
                    >
                        <Typography variant="h6">
                            Punchh
                        </Typography>
                    </Link>
                    <div className={classes.spacer}/>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="checkout"
                        onClick={() => history.push(ROUTES.CHECKOUT)}
                    >
                        <ShoppingCartIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}