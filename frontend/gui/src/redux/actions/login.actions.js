// third-party imports
import axios from "axios";

// local imports
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_COMPLETE } from "../types/login.types";
import { clearData, getExp, getToken, getUser, setExp, setToken, setUser } from "../../utility";

export const auth_start = () => {
    return {
        type    : AUTH_START
    }
}

export const auth_success = (token, user) => {
    return {
        type    : AUTH_SUCCESS,
        token   : token,
        user    : user
    }
}

export const auth_complete = () => {
    console.log('sadf');
    return {
        type    : AUTH_COMPLETE
    }
}

export const auth_fail = error => {
    return {
        type    : AUTH_FAIL,
        error   : error
    }
}

export const logout = () => {
    clearData();
    return {
        type    : AUTH_LOGOUT
    }
}

export const auth_logout = () => {
    return dispatch => {
        dispatch(logout())
    }
}

export const checkAuthTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, new Date(new Date(getExp()).getTime() - new Date().getTime()).getTime())
    }
};

export const authCheck = () => {
    return dispatch => {
        const token = getToken();
        if (token === null) {
            dispatch(logout());
        } else {
            const exp = getExp();
            if (new Date(exp) <= new Date()) {
                dispatch(logout());
            } else {
                const user = getUser();
                dispatch(auth_success(token, user));
                dispatch(auth_complete())
                dispatch(checkAuthTimeout());
            }
        }
    }
};

export const auth_login = (email, password) => {
    const path = 'http://127.0.0.1:8000/core/api/manager/login/'
    return dispatch => {
        dispatch(auth_start())
        axios.post(
            path, 
            {
                username: email,
                password: password
            }
        )
        .then(res => {
            const token = res.data.token;
            setToken(token);
            setExp();
            setUser(email);
            dispatch(auth_success(token, email));
            dispatch(auth_complete())
            dispatch(checkAuthTimeout()); 
        })
        .catch(({response}) => {
            dispatch(auth_fail(response.data.non_field_errors[0]))
        })
    }
}

// export const signup_fail = error => {
//     return {
//         type    : 'SIGNUP_FAIL',
//         error   : error
//     }
// }

// export const signup_success = () => {
//     return {
//         type    : 'SIGNUP_SUCCESS',
//     }
// }

// export const signup_start = () => {
//     return {
//         type    : 'SIGNUP_START',
//     }
// }


// export const signup = (data, history) => {
//     return dispatch => {
//         const {first_name, last_name, company, address, dob, email, password, confirm_password} = data 
//         const user = {
//             first_name,
//             last_name,
//             email,
//             password,
//             confirm_password
//         }
//         const completeData = {user, address, company, dob}

//         dispatch(signup_start())

//         if (getToken() !== null) {
//             const path='http://127.0.0.1:8000/core/api/employees/'
//             const {emp_id, city, mobile} = data
//             axios.post(
//                 path, 
//                 {...completeData, emp_id, city, mobile}, 
//                 {headers: {'Authorization': `token ${getToken()}`}}
//             )
//             .then(res => {
//                 dispatch(signup_success())
//                 dispatch(fetchEmp())
//                 history.push('/')
//             })
//             .catch(error => {
//                 const errors = []
//                 if ('user' in error.response.data) {
//                     const {email: uemail} = error.response.data.user
//                     errors.push(uemail[0])
//                 }
//                 if ('mobile' in error.response.data) {
//                     const {mobile} = error.response.data
//                     errors.push(mobile[0])
//                 }
//                 dispatch(signup_fail(errors))
//             })
//         } else {
//             const path='http://127.0.0.1:8000/core/api/managers/'
//             axios.post(path, completeData)
//             .then(res => {
//                 dispatch(signup_success())
//                 history.push('/login')
//             })
//             .catch(error => {
//                 const errors = []
//                 if ('user' in error.response.data) {
//                     const {email: uemail} = error.response.data.user
//                     errors.push(uemail[0])
//                 }
//                 if ('mobile' in error.response.data) {
//                     const {mobile} = error.response.data
//                     errors.push(mobile[0])
//                 }
//                 dispatch(signup_fail(errors))
//             })
//         }
//     }
// }
