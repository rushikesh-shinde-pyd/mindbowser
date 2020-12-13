import React, { useRef } from "react";

// third-party imports
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Route, Switch } from "react-router-dom";

// local imports
import CustomModal from "../components/CustomModel";
import ManagePage from "../components/ManagePage";
import { getToken } from "../utility";
import AddEmpForm from "../components/AddEmpForm";
import { auth_complete } from "../redux/actions/login.actions";


const Homepage = (props) => {
  // initialization
  const token     = getToken()
  const addModal  = useRef()
  
  // unset some data of login state 
  props.authComplete()

  return (
        !token 
        ? <Redirect to="/login" />
        : <>
            <div className="row mb-2">
              <div className="col-10">Employee List
                <CustomModal modalTitle="Add Employee" ref={addModal}>
                  <AddEmpForm modal={addModal}/>
                </CustomModal>
              </div>
              <div className="col-2">
                <button onClick={() => addModal.current.show()} type="button" className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} />  
                    Add employee
                </button>
              </div>
            </div>
            <Switch>
              <Route exact path="/pages/:pageNo" render={() => <ManagePage/>} />
              <Route exact path="/" render={() => <ManagePage/>} />
            </Switch>
          </>
      )
};

const mapDispatchToProps = dispatch => {
  return {
    authComplete  : () => dispatch(auth_complete())
  }
}

export default connect(null, mapDispatchToProps)(Homepage);

