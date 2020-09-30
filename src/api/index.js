import axios from 'axios'; 
import * as PUNCHH_CONSTANTS from '../constants/punchh'; 

// var signature = String.prototype.hashCode(PUNCHH_CONSTANTS.CLIENT_SECRET); 
var signature = ''; 

export function authorize(redirectUri) {
    return axios.get(`${PUNCHH_CONSTANTS.DASHBOARD_BASE_URL}/oauth/authorize`, {
        params: {
            client_id: PUNCHH_CONSTANTS.CLIENT_ID,
            force_logout: true,
            redirect_uri: redirectUri,
            sso: true,
            response_type: "code"
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export function generateAccessToken(code, redirectUri) {
    return axios.post(`${PUNCHH_CONSTANTS.API_BASE_URL}/oauth/token`, {
        code: code,
        client_id: PUNCHH_CONSTANTS.CLIENT_ID,
        client_secret: PUNCHH_CONSTANTS.CLIENT_SECRET,
        redirect_uri: redirectUri
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

export function getUser(accessToken) {
    return axios.get(`${PUNCHH_CONSTANTS.API_BASE_URL}/api/auth/users`, {
        params: {
            client: PUNCHH_CONSTANTS.CLIENT_ID,
            access_token: accessToken
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }    
    })
}

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