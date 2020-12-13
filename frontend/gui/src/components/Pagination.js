// react imports
import React, { useEffect } from "react";

// third-party imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// local imports


const Pagination = ({employees}) => {
    let pages = [];
    for (let i = 1; i < employees.data.count+1; i++) {
        pages.push(i);
    }
    return pages;
}


export default Pagination;