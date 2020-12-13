// local imports
import { updateObject } from "../../utility";
import {ADD_START, ADD_SUCCESS, ADD_FAIL, ADD_COMPLETE} from '../types/add.types'


const initial_state = {
    error   : [],
    loading : false,
    success : false
}

const addReducer = (state=initial_state, action) => {
    switch (action.type) {
        case ADD_START: return updateObject(state, {loading: true});
        case ADD_SUCCESS: return updateObject(state, {loading: false, success: true});
        case ADD_FAIL: return updateObject(state, {loading: false, error: action.error});
        case ADD_COMPLETE: return initial_state;

        default: return state;
    }
}

export default addReducer;