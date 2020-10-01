# punchh-auth-checkout

View the web app on https://punchh-auth-checkout.web.app. 

## Installation

You can download the project and run the app locally in development mode. When the project is downloaded, run `npm install` to install the necessary dependencies. Then run `npm start` to open the app on http://localhost:3000.    

## Stack

The web app was made with React, using Material UI as the UI framework, and hosted on Firebase Hosting. I used [`axios`](https://github.com/axios/axios) as the HTTP client for making API requests. 

## How It Works

### Authentication

At the start of opening the web app, there will be a backdrop that blocks any user input. The backdrop is there to authorize the redirect uri, generate the access token, and then get the user object. Once the user object is obtained, the backdrop is removed so the user can begin checking out.  

> I have temporarily disabled the backdrop as I wasn't unable to get it working correctly. 

### Checkout

The web app features a simple checkout flow with three steps.

#### Step 1: Personal Information

![](https://github.com/kennethlng/punchh-auth-checkout/blob/master/personal-info-form.png)

The first step during checkout allows the user to update their personal information (first name, last name, and email). 

```javascript
export function updateUser(user) {
    return axios.put(`${PUNCHH_CONSTANTS.API_BASE_URL}/api/auth/users`, {
        user: {
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName
        },
        client: PUNCHH_CONSTANTS.CLIENT_ID,
        authentication_token: user.authenticationToken,
        send_compliance_sms: false
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-pch-digest': signature
        }
    })
}
```

#### Step 2: Payment Method

![](https://github.com/kennethlng/punchh-auth-checkout/blob/master/payment-form.png)

The second checkout step allows the user to update their payment information and apply a coupon. 

Applying the coupon calls the following API:

```javascript
export function createRedemption(authentication_token, redemption_code, menu_items, receipt_amount, subtotal_amount, receipt_datetime, transaction_no, store_number) {
    return axios.post(`${PUNCHH_CONSTANTS.API_BASE_URL}/api/auth/redemptions/online_order`, {
        authentication_token,
        discount_type: 'redemption_code',
        redemption_code,
        receipt_amount,
        store_number,
        menu_items,
        subtotal_amount,
        receipt_datetime,
        transaction_no,
        channel: 'online_order',
        client: PUNCHH_CONSTANTS.CLIENT_ID
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-pch-digest': signature
        }
    })
}
```

#### Step 3: Review Order

![](https://github.com/kennethlng/punchh-auth-checkout/blob/master/review-order-form.png)

In the last checkout step, users review their order. When the user places the order, it calls the following API to checkin and earn loyalty points. 

```javascript
export function createCheckin(authentication_token, receipt_amount, menu_items, subtotal_amount, receipt_datetime, transaction_no) {
    return axios.post(`${PUNCHH_CONSTANTS.API_BASE_URL}/api/auth/checkins/online_order`, {
        authentication_token,
        receipt_amount,
        menu_items,
        subtotal_amount,
        receipt_datetime,
        transaction_no,
        store_number: "58",
        employee_id: 7,
        cc_last4: 4387,
        employee_name: "Test User",
        external_uid: "a unique id",
        client: PUNCHH_CONSTANTS.CLIENT_ID,
        channel: 'online_order'
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-pch-digest': signature
        }
    })
}
```