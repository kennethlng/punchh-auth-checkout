import axios from 'axios'; 
import * as PUNCHH_CONSTANTS from '../constants/punchh'; 

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