import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckoutContext from './context'; 
import { UserContext } from '../User'; 
import * as api from '../../api'; 

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

export default function PaymentForm() {
    const classes = useStyles(); 
    const checkout = useContext(CheckoutContext); 
    const user = useContext(UserContext); 
    const [redemptionCode, setRedemptionCode] = React.useState(''); 
    const [redemptionCodeMessage, setRedemptionCodeMessage] = React.useState(''); 

    const handleNext = () => {
        checkout.setStep(checkout.step + 1); 
    }

    const handleBack = () => {
        checkout.setStep(checkout.step - 1); 
    }

    const handleApplyCoupon = () => {
        api.createRedemption(user.authentication_token, redemptionCode, checkout.menuItems, 12.72, 12.72, "2015-04-03T18:05:01+05:30", 5678, "58")
        .then(function(response) {
            setRedemptionCodeMessage("Coupon successfully redeemed")
        })
        .catch(function(error) {
            console.log("Error creating redemption");
            setRedemptionCodeMessage("Unable to redeem coupon");
        })
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField 
                        required 
                        id="cardName" 
                        label="Name on card" 
                        fullWidth 
                        autoComplete="cc-name" 
                        defaultValue="Test User"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        defaultValue="4601 5938 3919 5038"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required 
                        id="expDate" 
                        label="Expiry date" 
                        fullWidth 
                        autoComplete="cc-exp" 
                        defaultValue="05/2021"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        defaultValue="523"
                    />
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs>
                        <TextField
                            id="coupon"
                            label="Add a gift card or promotion or voucher"
                            fullWidth
                            value={redemptionCode}
                            onChange={(e) => setRedemptionCode(e.target.value)}
                            helperText={redemptionCodeMessage}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleApplyCoupon}
                            disabled={redemptionCode === ''}
                        >
                            Apply coupon
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
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
                    Next
                </Button>
            </div>
        </React.Fragment>
  );
}