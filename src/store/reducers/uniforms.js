import { SET_UNIFORMS } from '../actions/type';

export default (state = [], action = {}) => {
    switch (action.type) {
        case SET_UNIFORMS:
            return action.uniforms
        default: return state;
    }
}