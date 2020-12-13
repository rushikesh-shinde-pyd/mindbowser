// react imports
import {useEffect} from "react";

// third-party imports
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// local imports
import { auth_logout } from "../redux/actions/login.actions";


const Logout = props => {
    useEffect(() => {
        props.auth_logout();
        props.history.push('/login');
    }, [])

    return null; 
}


const mapDispatchToProps = dispatch => {
    return {
        auth_logout: () => dispatch(auth_logout())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout));