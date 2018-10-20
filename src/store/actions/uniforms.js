// import axios from 'axios';
import { SET_UNIFORMS } from './type';

export function setUniforms(uniforms) {
    return {
        type: SET_UNIFORMS,
        uniforms
    };
}

export function updateUniforms(uniforms) {
    return dispatch => {
        dispatch(setUniforms(uniforms));
    }
}