// third-party imports
import axios from "axios";

// local imports
import { getToken } from "../../utility";
import * as actions from "../types/fetchEmp.types";


export const fetch_emp_start = () => {
    return {
        type    : actions.FETCH_EMP_START
    }
}

export const fetch_emp_success = data => {
    return {
        type    : actions.FETCH_EMP_SUCCESS,
        data    : data
    }
}

export const fetch_emp_fail = error => {
    return {
        type    : actions.FETCH_EMP_FAIL,
        error   : error
    }
}

const fetchEmp = (offset=0, path="http://127.0.0.1:8000/core/api/employees/") => {
    var accPath = null;
    offset == 0 ? accPath=`${path}?limit=5` : accPath=`${path}?limit=5&offset=${offset}`
    return dispatch => {
        dispatch(fetch_emp_start());
        axios.get(accPath, {
            headers: {
            'Authorization': `token ${getToken()}`
            }
        })
        .then(res => {
            dispatch(fetch_emp_success(res.data))
        })
        .catch(err => {
            dispatch(fetch_emp_fail(err.message))
        })
    }
}

export default fetchEmp;