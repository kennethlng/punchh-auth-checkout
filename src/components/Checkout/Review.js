import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'; 
import CheckoutContext from './context'; 
import { UserContext } from '../User'; 
import * as api from '../../api'; 

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function Review() {
    const classes = useStyles(); 
    const checkout = useContext(CheckoutContext); 
    const user = useContext(UserContext); 
    const [checkinMessage, setCheckinMessage] = React.useState(''); 

    const handleNext = () => {
        api.createCheckin(user.authentication_token, calculateSubtotal(), checkout.menuItems, calculateSubtotal(), "2015-03-20T15:23:20+05:30", 5678)
        .then(function(response) {
            checkout.setStep(checkout.step + 1); 
            setCheckinMessage("Loyalty checkin successful")
        })
        .catch(function(error) {
            console.log("Error creating checkin"); 
            setCheckinMessage("Unable to checkin")
        })  
    }

    const handleBack = () => {
        checkout.setStep(checkout.step - 1); 
    }

    const calculateSubtotal = () => {
        var subtotal = 0;

        checkout.menuItems.forEach(menuItem => {
            subtotal += menuItem.item_amount;
        })

        return subtotal; 
    }

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {checkout.menuItems.map(menuItem => (
                    <ListItem className={classes.listItem} key={menuItem.item_name}>
                        <ListItemText primary={menuItem.item_name} secondary={menuItem.item_qty} />
                    <Typography variant="body2">{menuItem.item_amount}</Typography>
                    </ListItem>    
                ))}
                <ListItem className={classes.listItem} key={"Total"}>
                    <ListItemText primary={"Total"} />
                    <Typography variant="subtitle1" className={classes.total}>
                        {calculateSubtotal()}
                    </Typography>
                </ListItem>
            </List>
            <div className={classes.buttons}>
                <Button
                    onClick={handleBack}
                    className={classes.button}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    Place order
                </Button>
            </div>
            <div>
                {checkinMessage !== '' ? (
                    <Typography>
                        {checkinMessage}
                    </Typography>
                ) : null }
            </div>
        </div>
    )
}