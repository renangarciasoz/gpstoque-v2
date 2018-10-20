import { combineReducers } from 'redux';

import auth from './auth';
import uniforms from './uniforms';


export const Reducers = combineReducers({
    auth,
    uniforms: uniforms
});
