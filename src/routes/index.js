import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';

import Home from '../pages/Home';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path='/' component={Home} />
      {/* <Route path='/requests' component={VerifySimulation(Simulation)} />
      <Route path='/products' component={VerifySimulation(Simulation)} /> */}
    </Switch>
  </ConnectedRouter>
);

export default Routes;