// react imports
import React from "react";

// third-party imports

import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

// local imports
import CRUDForm from "../components/CRUDForm";
import { getToken } from "../utility";
import { signup } from "../redux/actions/signup.actions";
import { fetchSingle, updateUser } from "../redux/actions/update.actions";


const AddEmployee = props => {
    console.log(props);
    const token = getToken()
    return (
        <CRUDForm action={props.action} {...props} />
    )
}

const mapStateToProps = state => {
    return {
        error   : state.signup.error.length === 0 ? null : state.signup.error,
        loading : state.signup.loading,
        signupSuccess : state.signup.signupSuccess,
        update  : state.update,
        sf      : state.singleFetch
    }
}


const mapDispatchToProps = dispatch => {
    return {
        signup: (data, history) => dispatch(signup(data, history)),
        update: (data, history) => dispatch(updateUser(data, history)),
        singleFetch : (history) => dispatch(fetchSingle(history))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEmployee));