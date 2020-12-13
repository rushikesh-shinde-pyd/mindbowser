// react imports
import React, { useEffect } from 'react';

// third-party imports
import { Switch, Route, withRouter } from "react-router-dom";

// local imports
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';
import { authCheck } from './redux/actions/login.actions';
import { connect } from 'react-redux';
import Signup from './pages/Signup';

const App = props => {
  useEffect(() => {
    props.autoSignIn()
  }, []);

  return (
    <>
      <Navbar  isAuthenticated={props.isAuthenticated} user={props.user} />
      <Switch>
        <Route exact path="/login" render={() => <Login {...props} />} />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route exact path="/logout" render={() => <Logout {...props}  />} />
        <Route path="/" render={() => <Homepage />} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </>
  )
}


const mapStateToProps = ({login}) => {
  return {
    isAuthenticated : login.token !== null,
    user            : login.user ? login.user : null,
    error           : login.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn  : () => dispatch(authCheck())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
