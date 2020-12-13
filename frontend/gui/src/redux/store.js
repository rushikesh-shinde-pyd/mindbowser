// react imports

// third-party imports
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";

// local imports
import loginReducer from "./reducers/login.reducers";
import fetchEmpReducer from "./reducers/fetchEmp.reducers";
import signupReducer from "./reducers/signup.reducers";
import updateReducer from "./reducers/update.reducers";
import singleFetchReducer from "./reducers/singleFetch.reducer";
import deleteReducer from "./reducers/delete.reducer";
import addReducer from "./reducers/add.reducer";


const rootReducer = combineReducers({
    login       : loginReducer,
    signup      : signupReducer,
    update      : updateReducer,
    employees   : fetchEmpReducer,
    delete      : deleteReducer,
    singleFetch : singleFetchReducer,
    add         : addReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;