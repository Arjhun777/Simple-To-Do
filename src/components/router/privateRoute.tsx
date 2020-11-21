import React from 'react';
import { Redirect } from 'react-router-dom';
import { getOrSetToken } from '../../utils/helper';

function PrivateRoute({component: Component, ...props}:any) {
    const checkIfLoggedIn = () => {
        if (getOrSetToken()) return true;
        return false;
    }

    return (
        <React.Fragment>
            {
                checkIfLoggedIn()
                ?   <Component {...props}></Component>
                :   <Redirect to="/login" {...props}></Redirect>
            }
        </React.Fragment>
    )
}

export default PrivateRoute;