import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Review from './Review'; 
import PaymentForm from './PaymentForm'; 
import Paper from '@material-ui/core/Paper';

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
}));

const steps = ['Payment', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <PaymentForm />;
        case 1:
            return <Review />;
    }
}

export default function Checkout() {
    const classes = useStyles(); 
    const [step, setStep] = React.useState(0); 
    
    const handleNext = () => {
        setStep(step + 1); 
    }

    const handleBack = () => {
        setStep(step - 1); 
    }

    return (
        <div className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center" className={classes.header}>
                    Checkout
                </Typography>
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
                            <div className={classes.buttons}>
                                {step !== 0 && (
                                    <Button 
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {step === steps.length - 1 ? "Place order" : "Next"}
                                </Button>
                            </div>
                    </React.Fragment>
                )}
            </Paper>
        </div>
    )
}