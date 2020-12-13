// local imports
import { updateObject } from "../../utility";
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_COMPLETE } from "../types/login.types";


const initial_state = {
    loading : false,
    token   : null,
    error   : null,
    user    : null,
    success : false
}

const loginReducer = (state=initial_state, action) => {
    switch (action.type) {
        case AUTH_START: return updateObject(state, {loading: true});
        case AUTH_SUCCESS: return updateObject(state, {success: true, error: null, token: action.token, user: action.user});
        case AUTH_FAIL: return updateObject(state, {loading: false, error: action.error});
        case AUTH_LOGOUT: return updateObject(state, {token: null, loading: false, success: false, error: null});
        case AUTH_COMPLETE: return updateObject(state, {success: false, loading: false});

        default: return state;
    }
}

export default loginReducer;