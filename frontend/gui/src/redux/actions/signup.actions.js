// third party imports
import axios from 'axios'

// local imports
import {SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL} from '../types/signup.types'
import fetchEmp from './fetchEmp.actions'


export const signup_fail = error => {
    return {
        type    : SIGNUP_FAIL,
        error   : error
    }
}

export const signup_success = () => {
    return {
        type    : SIGNUP_SUCCESS,
    }
}

export const signup_start = () => {
    return {
        type    : SIGNUP_START,
    }
}

export const signup = (data) => {
    return dispatch => {
        const {
            first_name,
            last_name,
            email,
            password,
            confirm_password,
            company,
            address,
            dob,
        } = data 
        const user = {
            first_name,
            last_name,
            email,
            password,
            confirm_password
        }
        const completeData = {user, address, company, dob}
        const path='http://127.0.0.1:8000/core/api/managers/'

        // signup starts
        dispatch(signup_start())
        axios.post(path, completeData)
        .then(res => {
            dispatch(signup_success())
        })
        .catch(error => {
            if ('user' in error.response.data) {
                const {email: uemail} = error.response.data.user
                dispatch(signup_fail(uemail))
            }
        })
    }
}


