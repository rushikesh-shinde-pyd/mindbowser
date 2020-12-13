import React from "react";

const InputItem = ({id, type, formik, placeholder}) => {
    return (
        <input 
            type={type} 
            id={id} 
            className="form-control" 
            value={formik.values[id]} 
            placeholder={placeholder} 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
        />
    )
}

export default InputItem;