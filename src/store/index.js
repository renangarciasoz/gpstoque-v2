import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { Reducers } from './reducers';
import thunk from 'redux-thunk';

import history from '../routes/history';

const middlewares = [routerMiddleware(history), thunk];

const store = createStore(connectRouter(history)(Reducers),
applyMiddleware(...middlewares));

export default store;