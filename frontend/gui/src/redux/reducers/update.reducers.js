// local imports
import { updateObject } from "../../utility";
import {UPDATE_START, UPDATE_SUCCESS, UPDATE_FAIL, UPDATE_COMPLETE} from '../types/update.types'


const initial_state = {
    error   : [],
    loading : false,
    success : false
}

const updateReducer = (state=initial_state, action) => {
    switch (action.type) {
        case UPDATE_START: return updateObject(state, {loading: true});
        case UPDATE_SUCCESS: return updateObject(state, {loading: false, success: true});
        case UPDATE_FAIL: return updateObject(state, {loading: false, error: action.error});
        case UPDATE_COMPLETE: return initial_state;

        default: return state;
    }
}

export default updateReducer;