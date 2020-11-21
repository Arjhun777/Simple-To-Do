import * as React from 'react';
import { Switch, Route, Router } from "react-router-dom";
import { lazy } from "react";
import { CircularProgress } from '@material-ui/core';
import Login from '../pageComponents/login/login';
import PrivateRoute from './privateRoute';
import history from '../../utils/history';

// Dynamic Imports
const HomeComponent = lazy(() => import('../pageComponents/home/home'));
const Task = lazy(() => import('../pageComponents/task/task'));

// Application routing configuration
const AppRouter = () => {
    return (
        <React.Suspense fallback={<CircularProgress className="module-loader" size={44} />}>
            <Router history={history}>
                <Switch>
                    <PrivateRoute path={"/home"} exact component={HomeComponent} />
                    <PrivateRoute path={"/edit-task/:id"} exact component={Task} />
                    <PrivateRoute path={"/new-task"} exact component={Task} />
                    <Route path={["/login", "/"]} exact component={Login} />
                </Switch>
            </Router>
        </React.Suspense>
    )
}

export default AppRouter;