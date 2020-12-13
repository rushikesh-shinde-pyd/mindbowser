// third party imports
import axios from 'axios'

// local imports
import { getToken } from '../../utility'
import {UPDATE_START, UPDATE_SUCCESS, UPDATE_FAIL, UPDATE_COMPLETE} from '../types/update.types'
import fetchEmp from './fetchEmp.actions'


export const update_fail = error => {
    return {
        type    : UPDATE_FAIL,
        error   : error
    }
}



export const update_success = () => {
    return {
        type    : UPDATE_SUCCESS,
    }
}

export const update_complete = () => {
    return {
        type    : UPDATE_COMPLETE,
    }
}


export const update_start = () => {
    return {
        type    : UPDATE_START,
    }
}

export const updateUser = (data, modal) => {
    const token = getToken()
    const USERID = localStorage.getItem('USERID')
    const EMPID = localStorage.getItem('EMPID') 
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
            emp_id
        } = data 
        const user = {
            first_name,
            last_name,
            email,
            id:USERID
        }
        const completeData = {user, address, company, city, dob, emp_id, mobile}
        console.log(completeData);
        
        // update starts
        dispatch(update_start())

        console.log('sd');
        const url = `http://127.0.0.1:8000/`
        const endpoint = `core/api/employees/${EMPID}/`
        axios.put(
            url + endpoint, 
            completeData, 
            {headers: {'Authorization': `token ${token}`}}
        )
        .then(res => {
          
            dispatch(update_success())
        })
        .catch(error => {
            const errorData = error.response.data
            const errors = []
            console.log(errorData);
            if (errorData.hasOwnProperty('email')) {
                const {email: uemail} = errorData
                errors.push(uemail[0])
            }
            if (errorData.hasOwnProperty('mobile')) {
                const {mobile} = errorData
                errors.push(mobile[0])
            }
            dispatch(update_fail(errors))
            modal.current.show()
        })
    
    }
}


export const fetchSingle_fail = error => {
    return {
        type    : 'FS_FAIL',
        error   : error
    }
}

export const fetchSingle_success = (data) => {
    return {
        type    : 'FS_SUCCESS',
        data    : data
    }
}

export const fetchSingle_start = () => {
    return {
        type    : 'FS_START',
    }
}

export const fetchSingle = (ref) => {
    const token = getToken()
    const EMPID = localStorage.getItem('EMPID') 
    const USERID = localStorage.getItem('USERID')
    console.log(ref);
    return dispatch => {
        const user = {
            id: USERID
        }
        const completeData = {user, id: EMPID}
        
        dispatch(fetchSingle_start())

        const path=`http://127.0.0.1:8000/core/api/employees/${EMPID}`
        axios.get(
            path, 
            {headers: {'Authorization': `token ${token}`}},
            completeData
        )
        .then(res => {
            console.log('sd');
            dispatch(fetchSingle_success(res.data))
            ref.current.show()
        })
        .catch(error => {
            // localStorage.removeItem('EMPID')
            // localStorage.removeItem('USERID')
            console.log(error);
            const errors = []
            if (error.response) {
                if ('user' in error.response.data) {
                    const {email: uemail} = error.response.data.user
                    errors.push(uemail[0])
                }
                if ('mobile' in error.response.data) {
                    const {mobile} = error.response.data
                    errors.push(mobile[0])
                }
            }
            dispatch(fetchSingle_fail(errors))
        })
    
    }
}

