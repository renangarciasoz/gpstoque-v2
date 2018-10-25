import { combineReducers } from 'redux';

import auth from './auth';
import devolutions from './devolutions';
import requests from './requests';
import uniforms from './uniforms';

export const Reducers = combineReducers({
    auth,
    devolutions,
    requests,
    uniforms
});
