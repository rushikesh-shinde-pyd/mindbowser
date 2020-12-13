// react imports
import React from "react";

// third-party imports
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, withRouter } from "react-router-dom";
import { logout } from "../redux/actions/login.actions";
import { getToken } from "../utility";


const Navbar = ({login}) => {
    const token = getToken()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
            <Link className="navbar-brand" to="/">Mindbowser - Task</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {
                        token 
                        ?   [
                                <li key="home" className="nav-item">
                                    <NavLink exact className="nav-link" to="/" activeClassName="active">
                                        <FontAwesomeIcon icon={faHome} /> 
                                        <span className="sr-only">(current)</span>
                                    </NavLink>
                                </li>,
                                <li key="dropdown" className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span style={{'marginLeft': '10px'}}>{login.user}</span> 
                                        {login.loading}
                                    </a> 
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <NavLink exact className="dropdown-item" to="/logout" activeClassName="active">
                                            <FontAwesomeIcon style={{'marginRight': '10px'}} icon={faSignInAlt} /> 
                                            <span>Logout</span>
                                        </NavLink>
                                    </div>
                                </li>
                            ]
                        :   <>
                                <li key="login" className="nav-item">  
                                    <NavLink exact className="nav-link" to="/login" activeClassName="active">Login <span className="sr-only">(current)</span></NavLink>
                                </li>
                                <li key="signup" className="nav-item">  
                                    <NavLink exact className="nav-link" to="/signup" activeClassName="active">Signup <span className="sr-only">(current)</span></NavLink>
                                </li>
                            </>
                    }
                    
                </ul>
            </div>
        </nav>
    )
}


const mapStateToProps = state => {
    return {
        login   : state.login
    }
}

export default connect(mapStateToProps, null)(Navbar);