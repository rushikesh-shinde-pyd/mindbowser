// react imports
import React from "react";

// third-party imports
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PageNotFound = () => {
    const location = useLocation();
    
    return (
        <div className="jumbotron">
            <h1 className="display-4">404</h1>
            <p className="lead">
                Oops! The Page <code>{location.pathname}</code> Could Not Be Found
            </p>
            <hr className="my-4" />
            <p>
                SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN REMOVED, NAME CHANGED 
                OR TEMPORARILY UNAVAILABLE.
            </p>
            <Link to="/" className="btn btn-primary btn-sm" role="button">GO TO HOMEPAGE</Link>
        </div>
    )
};

export default PageNotFound;