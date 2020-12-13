import React, { useEffect, useRef, useState } from 'react';

// third-party imports
import { connect } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

// local imports
import Employees from "../components/Employees";
import fetchEmp from '../redux/actions/fetchEmp.actions';
import { getOffset } from '../utility';
import CustomModal from './CustomModel';
import DeleteEmp from './DeleteEmp';
import UpdateEmpForm from './UpdateEmpForm';
import { home } from './Urls';


const ManagePage = (props) => {
    // initializations
    const {employees} = props
    const match         = useRouteMatch()
    const params        = useParams()
    const history       = useHistory()
    const updateModal   = useRef()
    const deleteModal   = useRef()

    // takes care of paginated records based on urls provided
    localStorage.setItem('prevPath', match.url)

    const [currentPage, setCurrentPage] = useState(params.pageNo 
        ? params.pageNo 
        : 1
    )
    let pages = [];

    for (let i = 1; i < (employees.data.count/5)+1; i++) {
        pages.push(i);
    }

    // functions
    const handlePagination = (i) => {
        setCurrentPage(i)    
    }
    
    // effects
    useEffect(() => {
            currentPage == 1
        ?   history.push(home)
        :   history.push(`/pages/${currentPage}`)
        
        setCurrentPage(currentPage)    
        props.fetchEmployees(getOffset(currentPage))
    }, [currentPage])


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
                    </div>
                </div>
            )
        :   employees.data && employees.data.results
        ?   (
                <div>
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
                            <Employees updateModal={updateModal} deleteModal={deleteModal}/>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                        {
                            pages.map((i) => <li className={currentPage==i ? 'page-item currentPage' : 'page-item' } key={'record_' + i}>
                                            <button className={currentPage==i ? "page-link btn-link disabled" : "page-link btn-link" } onClick={() => handlePagination(i)}>{i}</button>
                                            </li>)
                        }                    
                        </ul>
                    </nav>
                    <CustomModal modalTitle="Update Employee" ref={updateModal} >
                        <UpdateEmpForm modal={updateModal} />
                    </CustomModal>
                    <CustomModal modalTitle="Delete Employee" ref={deleteModal} >
                        <DeleteEmp modal={deleteModal} />
                    </CustomModal>
                </div>
            )
        :   (
                <div className="d-flex justify-content-center">
                    <div className="alert alert-danger" role="alert">
                        Please Refresh OR Try again later.
                    </div>
                </div>
            )
    );
};


function mapStateToProps(state) {
    return {
        employees   : state.employees,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmployees : (off) => dispatch(fetchEmp(off))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePage);
