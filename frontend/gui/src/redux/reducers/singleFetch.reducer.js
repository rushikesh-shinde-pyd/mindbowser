import { updateObject } from "../../utility";

// local imports
// import {'FS_START', 'FS_SUCCESS', 'FS_FAIL'} from '../types/update.types'


const initial_state = {
    loading : false,
    fsSuccess: false,
    error   : [],
    data    : null
}



const singleFetchReducer = (state=initial_state, action) => {
    console.log(action);
    switch (action.type) {
        case 'FS_START': return updateObject(state, {loading: true});
        case 'FS_SUCCESS': return updateObject(state, {loading: false, data: action.data, fsSuccess: true});
        case 'FS_FAIL': return updateObject(state, {loading: false, error: action.error});

        default: return state;
    }
}

export default singleFetchReducer;