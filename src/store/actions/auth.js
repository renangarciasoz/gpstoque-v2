import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './type';
import history from '../../routes/history';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        history.push('/login');
    }
}

export function login(data) {
    return dispatch => {
        return axios.post('https://gpstoque-api.herokuapp.com/auth/local', data)
            .then(res => {
                const token = res.data.jwt;
                const user = jwtDecode(token);
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                
                return axios.get(`https://gpstoque-api.herokuapp.com/user/${user._id}`)
                .then(res => {
                    dispatch(setCurrentUser(res.data));
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}