import { SET_DEVOLUTIONS } from '../actions/type';

export default (state = [], action = {}) => {
    switch (action.type) {
        case SET_DEVOLUTIONS:
            return action.devolutions
        default: return state;
    }
}