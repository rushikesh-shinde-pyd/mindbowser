import React, {useEffect, useState } from 'react';

// third party imports
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// local imports
import fetchEmp from '../redux/actions/fetchEmp.actions';
import { getOffset } from '../utility';
import { deleteUser, delete_complete } from '../redux/actions/delete.actions';


const DeleteEmp = props => {
    // initialization
    const params = useParams()
    const [modal, setModal] = useState({
        confirmed   : true,
        success     : false,
        error       : false
    })

    // functions
    const handleYes = () => {
        props.deleteUser()
    }

    const handleNo = () => {
        props.deleteComplete()
        props.modal.current.hide()
    }

    // effects
    useEffect(() => {
        if (props.delete.success) {
            props.deleteComplete()
            setModal({
                success     : true
            })
            setTimeout(() => {
                props.modal.current.hide()
                props.fetchEmp(getOffset(params.pageNo ? params.pageNo : 0))
            }, 2000)
        } else if (props.delete.error && !props.delete.loading) {
            setModal({
                error    : true
            })
        }
    }, [props.delete.loading])

    if (modal.success) {
        return (
            <div className="alert alert-success" role="alert">
                <p style={{marginBottom:"0px"}}>Record has been successfully deleted!</p>
            </div>
        )
    } else if (modal.confirmed) {
        return (
            <form >
                <h3>Do you really want to delete?</h3>
                <div className="btn-group" role="group" aria-label="Basic example">
                    {
                            props.delete.loading 
                        ?   <button className="btn btn-primary btn-sm w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                        :   <button onClick={handleYes} className="btn btn-sm btn-primary w-100" type="submit">YES</button>
                    }          
                    <button type="button" onClick={handleNo} className="btn btn-sm btn-danger">NO</button>
                </div>
            </form>    
        )
    } else if (modal.error) {
        return (
            <div className="alert alert-danger" role="alert">
                <p style={{marginBottom:"0px"}}>Record deletion has been failed!</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        delete  : state.delete
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEmp : (offset) => dispatch(fetchEmp(offset)),
        deleteComplete  : () => dispatch(delete_complete()),
        deleteUser  : () => dispatch(deleteUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEmp);