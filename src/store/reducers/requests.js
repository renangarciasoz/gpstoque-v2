import { SET_REQUESTS } from '../actions/type';

export default (state = [], action = {}) => {
    switch (action.type) {
        case SET_REQUESTS:
            return action.requests
        default: return state;
    }
}