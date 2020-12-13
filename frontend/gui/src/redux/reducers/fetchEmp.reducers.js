// local imports
import { updateObject } from "../../utility";
import * as actions from "../types/fetchEmp.types";


const initial_state = {
    loading : false,
    data    : {},
    error   : null,
}



const fetchEmpReducer = (state=initial_state, action) => {
    switch (action.type) {
        case actions.FETCH_EMP_START: return updateObject(state, {loading: true});
        case actions.FETCH_EMP_SUCCESS: return updateObject(state, {loading: false, data: action.data});
        case actions.FETCH_EMP_FAIL: return updateObject(state, {loading: false, error: action.error});

        default: return state;
    }
}

export default fetchEmpReducer;