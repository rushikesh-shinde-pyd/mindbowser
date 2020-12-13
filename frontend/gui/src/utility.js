export const isAuthenticated = localStorage.getItem('token') != null ? true : false

export const getExp = () => {
    return localStorage.getItem('exp');
};

export const setExp = () => {
    localStorage.setItem('exp', new Date(new Date().getTime() + (1000*60*60*24*10)))
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = token => {
    return localStorage.setItem('token', token);
};

export const getUser = () => {
    return localStorage.getItem('user');
};

export const setUser = email => {
    return localStorage.setItem('user', email);
};


export const clearData = () => {
    localStorage.removeItem('exp');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const updateObject = (oldObj, newObj) => {
    return {...oldObj, ...newObj};
}

export const getOffset = offset => (5 * (offset - 1))

export const validateData = values => {
    const errors = {}

    if (!values.first_name) errors.first_name = 'Required';
    else if (values.first_name.length > 15) errors.first_name = 'Must be 15 characters or less';

    if (!values.last_name) errors.last_name = 'Required';
    else if (values.last_name.length > 20) errors.last_name = 'Must be 20 characters or less';

    if (!values.address) errors.address = 'Required';
    else if (values.address.length > 20) errors.address = 'Must be 20 characters or less';

    if (!values.company) errors.company = 'Required';
    else if (values.company.length > 20) errors.company = 'Must be 20 characters or less';

    if (!values.dob) errors.dob = 'Required';
    else if (values.dob) {
        if (new Date(values.dob) > new Date()) errors.dob = 'Invalid date';
    }

    if (!values.email) errors.email = 'Required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';

    return errors
}

export const validatePasswords = values => {
    const errors = {}

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    } else if (values.password.length < 8) {
        errors.password = 'Password length must be atleast 8 characters';
    }
    
    if (!values.confirm_password) {
        errors.confirm_password = 'Required';
    } else if (values.confirm_password.length > 20) {
        errors.confirm_password = 'Must be 20 characters or less';
    } else if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Password mismatch';
    } else if (values.confirm_password.length < 8) {
        errors.confirm_password = 'Password length must be atleast 8 characters';
    }

    return errors
}


export const validateMobile = values => {
    const errors = {}
    if (!values.mobile) errors.mobile = 'Required';
    else if (!/^[789][0-9]{9}$/i.test(values.mobile)) errors.mobile = 'Invalid mobile number';

    return errors
}

export const validateCity = values => {
    const errors = {}
    if (!values.city) errors.city = 'Required';
    else if (values.city.length > 20) errors.city = 'Must be 20 characters or less';
    
    return errors
}