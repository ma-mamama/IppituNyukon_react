import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
const PrivateRoute = ({ component: Component, exact, path }) => {
    const {user} = useAuthContext();
    return user ? (
        <Route 
            exact={exact}
            path={path}
            component={Component}
        />
    ): (
     <Redirect to="/login" />
    );
};

export default PrivateRoute;