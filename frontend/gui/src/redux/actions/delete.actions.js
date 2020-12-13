// third party imports
import axios from 'axios'

// local imports
import { getToken } from '../../utility'
import {DELETE_START, DELETE_SUCCESS, DELETE_FAIL, DELETE_COMPLETE} from '../types/delete.types'
import fetchEmp from './fetchEmp.actions'


export const delete_fail = error => {
    return {
        type    : DELETE_FAIL,
        error   : error
    }
}



export const delete_success = () => {
    return {
        type    : DELETE_SUCCESS,
    }
}

// export const delete_un = (err) => {
//     return {
//         type    : 'DELETE_UN',
//         error   : err
//     }
// }


export const delete_complete = () => {
    return {
        type    : DELETE_COMPLETE,
    }
}


export const delete_start = () => {
    return {
        type    : DELETE_START,
    }
}


export const deleteUser = () => {
    const token = getToken()
    const EMPID = localStorage.getItem('EMPID') 
    return dispatch => {
        // DELETE starts
        dispatch(delete_start())

        const url = `http://127.0.0.1:8000/`
        const endpoint = `core/api/employees/${EMPID}/`

        axios.delete(
            url + endpoint, 
            {headers: {'Authorization': `token ${token}`}}
        )
        .then(res => {
            console.log('sd', res);
            res.status === 204 && dispatch(delete_success())
        })
        .catch(error => {
            console.log(error);
            dispatch(delete_fail(error))
            // history.mref.current.show()
        })
    
    }
}
