// import axios from 'axios';
import { SET_DEVOLUTIONS } from './type';

export function setDevolutions(devolutions) {
    return {
        type: SET_DEVOLUTIONS,
        devolutions
    };
}

export function updateDevolutions(devolutions) {
    return dispatch => {
        dispatch(setDevolutions(devolutions));
    }
}