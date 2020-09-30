import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Review from './Review'; 
import UserProfileForm from './UserProfileForm'; 
import PaymentForm from './PaymentForm'; 
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckoutContext from './context'; 
import { menuItems } from './menuItems'; 

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    }
}));

const steps = ['Personal Info', 'Payment', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <UserProfileForm/>; 
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
    }
}

export default function Checkout() {
    const classes = useStyles(); 
    const [step, setStep] = useState(0); 

    return (
        <CheckoutContext.Provider 
            value={{
                step,
                setStep: (step) => setStep(step),
                menuItems
            }}
        >        
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" className={classes.header}>
                        Checkout
                    </Typography>
                    <Stepper activeStep={step} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {step === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order confirmation, and will
                                send you an update when your order has shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(step)}
                        </React.Fragment>
                    )}
                </Paper>
            </div>
        </CheckoutContext.Provider>
    )
}