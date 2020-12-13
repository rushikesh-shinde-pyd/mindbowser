// third party imports
import axios from 'axios'

// local imports
import { getToken } from '../../utility'
import {ADD_START, ADD_SUCCESS, ADD_FAIL, ADD_COMPLETE} from '../types/add.types'
import fetchEmp from './fetchEmp.actions'


export const add_fail = error => {
    return {
        type    : ADD_FAIL,
        error   : error
    }
}

export const add_success = () => {
    return {
        type    : ADD_SUCCESS,
    }
}

export const add_complete = () => {
    return {
        type    : ADD_COMPLETE,
    }
}


export const add_start = () => {
    return {
        type    : ADD_START,
    }
}

export const addUser = (data, modal) => {
    console.log(data, modal);
    const token = getToken()
    return dispatch => {
        const {
            first_name,
            last_name,
            company,
            address,
            city,
            dob,
            mobile, 
            email,
            emp_id,
            password,
            confirm_password
        } = data 
        const user = {
            first_name,
            last_name,
            email,
            password,
            confirm_password
        }
        const completeData = {user, address, company, city, dob, emp_id, mobile}
        console.log(completeData);
        
        // update starts
        dispatch(add_start())

        console.log('sd');
        const url = `http://127.0.0.1:8000/`
        const endpoint = `core/api/employees/`
        axios.post(
            url + endpoint, 
            completeData, 
            {headers: {'Authorization': `token ${token}`}}
        )
        .then(res => {
            console.log(res);
            dispatch(add_success())
        })
        .catch(error => {
            console.log(error, error.response, error.response.data);
            const errorData = error.response.data
            const errors = []
            if (errorData.hasOwnProperty('user')) {
                const {email: uemail} = errorData.user
                errors.push(uemail[0])
            }
            if (errorData.hasOwnProperty('mobile')) {
                const {mobile} = errorData
                errors.push(mobile[0])
            }
            dispatch(add_fail(errors))
            modal.current.show()
        })
    
    }
}
