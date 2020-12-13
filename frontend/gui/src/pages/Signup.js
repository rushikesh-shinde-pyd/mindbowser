import React, { useEffect } from "react";

// third-party imports
import {useFormik} from 'formik';
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

// local imports
import { getToken, validateData, validatePasswords } from "../utility";
import InputItem from "../components/InputItem";
import { signup } from "../redux/actions/signup.actions";
import { login } from "../components/Urls";


const Signup = props => {
    // initialization
    const token     = getToken()
    const {signup}  = props
    const history   = useHistory()
    
    var initialValues = {
        first_name          : '',
        last_name           : '',
        email               : '',
        address             : '',
        company             : '',
        dob                 : '',
        password            : '',
        confirm_password    : ''
    }
    const validate = values => {
        const extendedErrors = validateData(values)
        const passwordErrors = validatePasswords(values)
        return {...extendedErrors, ...passwordErrors};
    };
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            props.signupUser(values)
        }
    });

    // effects
    useEffect(() => {
        if (signup.success) history.push(login)
    }, [signup.success])

    return (
            !token 
        ?   <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <h5 className="card-header">Manager Signup</h5>
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-sm-6">
                                            <InputItem 
                                                placeholder="First name" 
                                                type="text" 
                                                id="first_name" 
                                                formik={formik}
                                            />
                                            {
                                                formik.touched.first_name 
                                                && formik.errors.first_name 
                                                && <div className="text-danger">{formik.errors.first_name}</div>
                                            }
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <InputItem 
                                                placeholder="Last name" 
                                                type="text" 
                                                id="last_name" 
                                                formik={formik}
                                            />
                                            {
                                                formik.touched.last_name 
                                                && formik.errors.last_name 
                                                && <div className="text-danger">{formik.errors.last_name}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-sm-6">
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
                                        <div className="form-group col-sm-6">
                                            <InputItem 
                                                placeholder="Address" 
                                                type="text" 
                                                id="address" 
                                                formik={formik}
                                            />
                                            {
                                                formik.touched.address 
                                                && formik.errors.address 
                                                && <div className="text-danger">{formik.errors.address}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-sm-6">
                                            <input 
                                                type="date" 
                                                id="dob" 
                                                className="form-control"
                                                min="1980-01-01" 
                                                max="2010-01-11" 
                                                value={formik.values.dob} 
                                                placeholder="Date of birth" 
                                                onBlur={formik.handleBlur} 
                                                onChange={formik.handleChange} 
                                            />
                                            <small id="mobilehelp" className="form-text text-muted">
                                                For Date of birth choose between 1980-01-01 and 2010-01-11.
                                            </small>
                                            {
                                                formik.touched.dob 
                                                && formik.errors.dob 
                                                && <div className="text-danger">{formik.errors.dob}</div>
                                            }
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <InputItem 
                                                placeholder="Company" 
                                                type="text" 
                                                id="company" 
                                                formik={formik}
                                            />
                                            {
                                                formik.touched.company 
                                                && formik.errors.company 
                                                && <div className="text-danger">{formik.errors.company}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-sm-6">
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
                                        <div className="form-group col-sm-6">
                                            <InputItem 
                                                placeholder="Confirm password" 
                                                type="password" 
                                                id="confirm_password" 
                                                formik={formik}
                                            />
                                            {
                                                formik.touched.confirm_password 
                                                && formik.errors.confirm_password 
                                                && <div className="text-danger">{formik.errors.confirm_password}</div>
                                            }
                                        </div>
                                    </div>
                                    {
                                            signup.error 
                                        &&  <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {signup.error}
                                                </div>
                                            </div>  
                                    }
                                    {
                                            signup.loading 
                                        ? <button className="btn btn-primary w-100" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                        : <button type="submit" className="btn w-100 btn-primary">Signup</button>
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
        signup  : state.signup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupUser  : (data) => dispatch(signup(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);