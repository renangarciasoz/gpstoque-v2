// import axios from 'axios';
import { SET_REQUESTS } from './type';

export function setRequests(requests) {
    return {
        type: SET_REQUESTS,
        requests
    };
}

export function updateRequests(requests) {
    return dispatch => {
        dispatch(setRequests(requests));
    }
}