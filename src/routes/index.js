import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';

import requireAuth from '../utils/requireAuth';

import Home from '../pages/';
import Uniforms from '../pages/Uniforms/';
import Requests from '../pages/Requests/';
import Devolutions from '../pages/Devolutions/';
import Dashboard from '../pages/Dashboard/';

import Login from '../pages/Login/';

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path='/' component={requireAuth(Home)} />
            <Route exact path='/uniforms' component={requireAuth(Uniforms)} />
            <Route exact path='/requests' component={requireAuth(Requests)} />
            <Route exact path='/devolutions' component={requireAuth(Devolutions)} />
            <Route exact path='/dashboard' component={requireAuth(Dashboard)} />

            <Route exact path='/login' component={Login} />
        </Switch>
    </ConnectedRouter>
);

export default Routes;