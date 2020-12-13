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