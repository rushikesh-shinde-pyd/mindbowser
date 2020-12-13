import { updateObject } from "../../utility";

// local imports
import {DELETE_START, DELETE_SUCCESS, DELETE_FAIL, DELETE_COMPLETE} from '../types/delete.types'


const initial_state = {
    error   : null,
    loading : false,
    success : false
}



const deleteReducer = (state=initial_state, action) => {
    switch (action.type) {
        case DELETE_START: return updateObject(state, {loading: true});
        case DELETE_SUCCESS: return updateObject(state, {loading: false, success: true});
        case DELETE_FAIL: return updateObject(state, {loading: false, error: action.error});
        // case 'DELETE_UN': return updateObject(state, {loading: false, success: false, error: action.error});
        case DELETE_COMPLETE: return initial_state;

        default: return state;
    }
}

export default deleteReducer;