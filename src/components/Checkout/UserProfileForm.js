import React from 'react'; 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CheckoutContext from './context'; 
import { UserContext } from '../User'; 
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

export default function UserProfileForm() {
    const checkout = React.useContext(CheckoutContext); 
    const user = React.useContext(UserContext); 
    const classes = useStyles(); 
    const [firstName, setFirstName] = React.useState(user.first_name); 
    const [lastName, setLastName] = React.useState(user.last_name); 
    const [email, setEmail] = React.useState(user.email); 

    const handleNext = () => {
        var updatedUser = user; 
        user.first_name = firstName; 
        user.last_name = lastName; 
        user.email = email; 

        api.updateUser(updatedUser)
        .then(function(response) {
            checkout.setStep(checkout.step + 1); 
        })
        .catch(function(error) {
            console.log("Error updating user information");
            checkout.setStep(checkout.step + 1); 
        })
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required 
                        id="firstName" 
                        label="First name" 
                        fullWidth
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        required 
                        id="lastName" 
                        label="Last name" 
                        fullWidth 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
            </Grid>
            <div className={classes.buttons}>
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
    )
}