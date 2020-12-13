import React, { useEffect } from "react";

// third-party imports
import {useFormik} from 'formik';
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

// local imports
import { getToken } from "../utility";
import InputItem from "../components/InputItem";
import { auth_login } from "../redux/actions/login.actions";


const Login = props => {
    // initialization
    const token     = getToken()
    const {login}   = props
    const history   = useHistory()
    const validate  = values => {
    const errors    = {};
        if (!values.email) errors.email = 'Required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';
  
        if (!values.password) errors.password = 'Required';
  
        return errors;
      };
    const initialValues = {
        email: '',
        password: ''
    }
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: ({email, password}) => {
          props.authLogin(email, password);
        }
    });

    // effect
    useEffect(() => {
        if (login.success) history.push(localStorage.getItem('prevPath'))    
    }, [login.success])    

    return (
            !token 
        ?   <div className="container">
                <div className="row">
                    <div className="offset-sm-3 col-sm-6">
                        <div className="card">
                            <h5 className="card-header">Manager Login</h5>
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <InputItem 
                                            placeholder="Email" 
                                            type="email" 
                                            id="email" 
                                            formik={formik}
                                        />
                                        {
                                            formik.touched.email 
                                            && formik.errors.email 
                                            && <div className="text-danger">{formik.errors.email}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <InputItem 
                                            placeholder="Password" 
                                            type="password" 
                                            id="password" 
                                            formik={formik}
                                        />
                                        {
                                            formik.touched.password 
                                            && formik.errors.password 
                                            && <div className="text-danger">{formik.errors.password}</div>
                                        }
                                    </div>
                                    {
                                        login.error 
                                        && <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {login.error}
                                                </div>
                                            </div>  
                                    }
                                    {
                                        login.loading 
                                        ? <button className="btn btn-primary w-100" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                        : <button type="submit" className="btn w-100 btn-primary">Log In</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>                    
            </div>
        :   <Redirect to={localStorage.getItem('prevPath')} />
    )
}

const mapStateToProps = state => {
    return {
        login   : state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogin: (email, password) => dispatch(auth_login(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);