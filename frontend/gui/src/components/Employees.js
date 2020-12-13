// react imports
import React, { useEffect } from "react";

// third-party imports
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// local imports
import { fetchSingle, update_complete } from '../redux/actions/update.actions';
import { delete_complete } from "../redux/actions/delete.actions";


const Employees = (props) => {
    // initialization
    const {employees, updateModal, deleteModal} = props

    // functions
    const handleEdit  = (id, uid) => {  
        // proceeds to perform update operation
        props.updateComplete()
        localStorage.setItem('EMPID', id)
        localStorage.setItem('USERID', uid)
        props.fetchsingle(updateModal)
    }

    const handleDelete = (id) => {
        // proceeds to perform delete operation
        props.deleteComplete()
        localStorage.setItem('EMPID', id)
        deleteModal.current.show()
    }

    return (        
            employees 
        &&  employees.data.results 
        ?   employees.data.results.map(employee => <tr key={employee.user.id}>
            <td>{employee.emp_id}</td>
            <td>{employee.user.first_name.toUpperCase()} {employee.user.last_name.toUpperCase()}</td>
            <td>{employee.dob}</td>
            <td>{employee.user.email}</td>
            <td>{employee.mobile}</td>
            <td>{employee.city}</td>
            <td>{employee.address}</td>
            <td>{employee.company}</td>
            <td className="text-center">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => handleEdit(employee.id, employee.user.id)} className="btn btn-sm btn-primary">
                        <FontAwesomeIcon icon={faUserEdit} />  
                        Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(employee.id)} className="btn btn-sm btn-danger">Delete <FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </td>
        </tr>
        )
        :   <td>NO DATA</td>
    )
}

function mapStateToProps(state) {
    return {
        employees : state.employees
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateComplete  : () => dispatch(update_complete()),
        fetchsingle     : (modal) => dispatch(fetchSingle(modal)),
        deleteComplete  : () => dispatch(delete_complete())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
