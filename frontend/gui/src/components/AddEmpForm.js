import React, { useEffect, useState } from 'react';

// third party imports
import {useFormik} from 'formik';
import { connect } from 'react-redux';

// local imports
import InputItem from "../components/InputItem";
import fetchEmp from '../redux/actions/fetchEmp.actions';
import { addUser, add_complete } from '../redux/actions/add.actions';
import { useParams } from 'react-router-dom';
import { getOffset } from '../utility';


const AddEmpForm = props => {
    console.log(props);
    // initialization
    const {add} = props
    const params            = useParams()
    const [data, setData]  = useState({})
    const [modal, setModal] = useState({
        submitted   : true,
        confirmed   : false,
        success     : false
    })
    var initialValues = {
        first_name          : '',
        last_name           : '',
        email               : '',
        address             : '',
        company             : '',
        mobile              : '',
        emp_id              : '',
        city                : '',
        dob                 : '',
        password            : '',
        confirm_password    : ''
    }
    const validate = values => {
        const errors = {};

        if (!values.emp_id) errors.emp_id = 'Required'

        if (!values.first_name) errors.first_name = 'Required';
        else if (values.first_name.length > 15) errors.first_name = 'Must be 15 characters or less';

        if (!values.last_name) errors.last_name = 'Required';
        else if (values.last_name.length > 20) errors.last_name = 'Must be 20 characters or less';

        if (!values.address) errors.address = 'Required';
        else if (values.address.length > 20) errors.address = 'Must be 20 characters or less';

        if (!values.mobile) errors.mobile = 'Required';
        else if (!/^[789][0-9]{9}$/i.test(values.mobile)) errors.mobile = 'Invalid mobile number';

        if (!values.company) errors.company = 'Required';
        else if (values.company.length > 20) errors.company = 'Must be 20 characters or less';

        if (!values.city) errors.city = 'Required';
        else if (values.city.length > 20) errors.city = 'Must be 20 characters or less';

        if (!values.dob) errors.dob = 'Required';
        else if (values.dob) {
            if (new Date(values.dob) > new Date()) errors.dob = 'Invalid date';
        }

        if (!values.email) errors.email = 'Required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';
        
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 20) {
            errors.password = 'Must be 20 characters or less';
        } else if (values.password.length < 8) {
            errors.password = 'Password length must be atleast 8 characters';
        }
        
        if (!values.confirm_password) {
            errors.confirm_password = 'Required';
        } else if (values.confirm_password.length > 20) {
            errors.confirm_password = 'Must be 20 characters or less';
        } else if (values.password !== values.confirm_password) {
            errors.confirm_password = 'Password mismatch';
        } else if (values.confirm_password.length < 8) {
            errors.confirm_password = 'Password length must be atleast 8 characters';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            setModal({
                confirmed   : true,
            })
            setData(values)
        }
    })

    // functions
    const handleYes = () => {
        props.addUser(data, props.modal)
    }

    const handleNo = () => {
        props.addComplete()
        setModal({
            submitted    : true
        })
    }
    
    // effects
    useEffect(() => {
        if (add.success) {
            props.addComplete()
            setModal({
                success     : true
            })
            setTimeout(() => {
                props.modal.current.hide()
                props.fetchEmp(getOffset(params.pageNo ? params.pageNo : 0))
            }, 2000)
        } else if (add.error.length && !add.loading) {
            setModal({
                submitted    : true
            })
        }
    }, [add.loading])

    if (modal.submitted) {
        return (
               <form onSubmit={formik.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-sm-6">
                            <InputItem 
                                placeholder="Employee ID" 
                                type="text" 
                                id="emp_id" 
                                formik={formik}
                            />
                            {
                                formik.touched.emp_id 
                                && formik.errors.emp_id 
                                && <div className="text-danger">{formik.errors.emp_id}</div>
                            }
                        </div>
                        <div className="form-group col-sm-3">
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
                        <div className="form-group col-sm-3">
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
                            <input 
                                type="text" 
                                id="mobile"    
                                className="form-control"
                                value={formik.values.mobile} 
                                placeholder="Mobile number" 
                                pattern="[789][0-9]{9}"
                                onBlur={formik.handleBlur} 
                                onChange={formik.handleChange} 
                            />
                            <small id="mobileHelp" className="form-text text-muted">
                                Requested format [789][0-9]&#123;9&#125;
                            </small>
                            {
                                formik.touched.mobile 
                                && formik.errors.mobile 
                                && <div className="text-danger">{formik.errors.mobile}</div>
                            }
                        </div>
                    </div>
            
                    <div className="form-row">
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
                        <div className="form-group col-sm-6">
                            <InputItem 
                                placeholder="City" 
                                type="text" 
                                id="city" 
                                formik={formik}
                            />
                            {
                                formik.touched.city 
                                && formik.errors.city 
                                && <div className="text-danger">{formik.errors.city}</div>
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
                        props.add.error.length > 0
                        && <div className="alert alert-danger" role="alert">
                            {props.add.error.map((error, index) => <p style={{marginBottom: '0px'}} key={'error'+index}>{error[0].toUpperCase()+error.slice(1)}</p>)}
                        </div>
                    }
                    <button className="btn btn-primary w-100" type="submit">Add Employee</button>
                </form>
        );
    } else if (modal.success) {
        return (
            <div className="alert alert-success" role="alert">
                <p style={{marginBottom:"0px"}}>Successfully addd record!</p>
            </div>
        )
    } else if (modal.confirmed) {
        return (
            <form >
                <h3>Do you really want to add?</h3>
                <div className="btn-group" role="group" aria-label="Basic example">
                    {
                            add.loading 
                        ?   <button className="btn btn-primary btn-sm w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                        :   <button onClick={handleYes} className="btn btn-sm btn-primary w-100" type="submit">YES</button>
                    }          
                    <button type="button" onClick={handleNo} className="btn btn-sm btn-danger">NO</button>
                </div>
            </form>   
        )
    } 
}

function mapStateToProps(state) {
    return {
        add     : state.add,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmp : (offset) => dispatch(fetchEmp(offset)),
        addComplete  : () => dispatch(add_complete()),
        addUser  : (data, modal) => dispatch(addUser(data, modal)),        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmpForm);