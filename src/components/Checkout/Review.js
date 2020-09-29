import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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
}));

export default function Review() {
    const classes = useStyles(); 

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem} key={"Product name"}>
                    <ListItemText primary={"Product name"} secondary={"Product description"} />
                    <Typography variant="body2">$9.99</Typography>
                </ListItem>
                <ListItem className={classes.listItem} key={"Coupon"}>
                    <ListItemText primary={"Coupon"} secondary={"Discount from Punchh"} />
                    <Typography variant="body2">-$2.00</Typography>
                </ListItem>
                <ListItem className={classes.listItem} key={"Total"}>
                    <ListItemText primary={"Total"} />
                    <Typography variant="subtitle1" className={classes.total}>
                        $7.99
                    </Typography>
                </ListItem>
            </List>
        </div>
    )
}