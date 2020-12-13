import React from "react";

// thrid-party imports
import { connect } from 'react-redux';
import { Link, useLocation } from "react-router-dom";

// local imports
import Employees from "../components/Employees";


const EmployeeTable = props => {
    // initialization
    const {employees} = props
    const location = useLocation()

    return (  
        employees.loading
        ?   (
                <div className="d-flex justify-content-center">
                    <div className="card">
                        <div className="d-flex justify-content-center p-2">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    </div>
                </div>
            )    
        :   employees.error
        ?   (
                <div className="d-flex justify-content-center">
                    <div className="alert alert-danger" role="alert">
                        Please Refresh OR Try again later.
                        <hr/>
                        <div className="d-flex justify-content-center">
                            <Link to={location.pathname}>Refresh</Link>
                        </div>
                    </div>
                </div>
            )
        :   employees.data && employees.data.results
        ?   (
                <table className="table table-sm table-hover table-responsive-sm">
                    <thead>
                        <tr className="bg-dark text-light">
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">City</th>
                        <th scope="col">Address</th >
                        <th scope="col">Company</th>
                        <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Employees/>
                    </tbody>
                </table>
            )
        :   (
                <div className="d-flex justify-content-center">
                    <div className="alert alert-danger" role="alert">
                        Please Refresh OR Try again later.
                        <hr/>
                        <div className="d-flex justify-content-center">
                            <Link to={location.pathname}>Refresh</Link>
                        </div>
                    </div>
                </div>
            )
    )
}

function mapStateToProps(state) {
    return {
        employees : state.employees
    };
}

export default connect(mapStateToProps, null)(EmployeeTable);