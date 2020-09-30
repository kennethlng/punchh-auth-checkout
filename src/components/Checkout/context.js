import React from 'react';

const CheckoutContext = React.createContext({
    step: 0,
    setStep: (step) => null,
    menuItems: []
}); 

export default CheckoutContext; 