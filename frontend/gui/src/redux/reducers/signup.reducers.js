// local imports
import { updateObject } from "../../utility";


const initial_state = {
    loading : false,
    success : false,
    error   : null
}

const signupReducer = (state=initial_state, action) => {
    switch (action.type) {
        case 'SIGNUP_START': return updateObject(state, {loading: true});
        case 'SIGNUP_SUCCESS': return updateObject(state, {loading: false, error: null, success: true});
        case 'SIGNUP_FAIL': return updateObject(state, {loading: false, error: action.error});

        default: return state;
    }
}

export default signupReducer;