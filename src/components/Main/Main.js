import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavigationBar } from '../NavigationBar'; 
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import * as ROUTES from '../../constants/routes'; 
import { Landing } from '../Landing'; 
import { Checkout } from '../Checkout'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UserContext } from '../User'; 
import { AuthenticationBackdrop } from '../Authentication'; 

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3)
    }
}));

export default function Main() {
    const classes = useStyles();
    const [user, setUser] = React.useState(null); 

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <UserContext.Provider 
                value={{
                    user,
                    setUser: (user) => setUser(user)
                }}
            >
                <NavigationBar />
                <Container maxWidth="xl" className={classes.container}>
                    <Switch>
                        <Route path={ROUTES.CHECKOUT}>
                            <Checkout/>
                        </Route>
                        <Route path={ROUTES.HOME}>
                            <Landing/>
                        </Route>
                    </Switch>
                </Container>
            </UserContext.Provider>
            {/* <AuthenticationBackdrop /> */}
        </div>
    )
}