import axios from 'axios';
import * as actionTypes from './actionTypes';

const apiKey = process.env.REACT_APP_API_KEY;

export const clearMessages = () => {
    return {
        type: actionTypes.CLEAR_MESAGES
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const autoAuthSuccess = (data, isSignUp) => {
    return {
        type: actionTypes.AUTO_AUTH_SUCCESS,
        idToken: data.idToken,
        userId: data.localId,
        expiresIn: data.expiresIn,
        isSignUp: isSignUp
    }
}

export const autoAuthFailure = () => {
    return {
        type: actionTypes.AUTO_AUTH_FAILURE
    }
}

export const authSuccess = (data, isSignUp) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: data.idToken,
        userId: data.localId,
        expiresIn: data.expiresIn,
        isSignUp: isSignUp
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.LOGOUT
    }
}

export const setAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const credentials = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = isSignUp ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey :
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
        axios.post(url, credentials)
            .then(
                response => {
                    const expirationTime = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                    localStorage.setItem('idToken', response.data.idToken);
                    localStorage.setItem('expiresIn', expirationTime);
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authSuccess(response.data, isSignUp));
                    dispatch(setAuthTimeout(response.data.expiresIn));
                }
            )
            .catch(
                error => dispatch(authFailure(error))
            );
    }
}

export const autoAuth = () => {
    return dispatch => {
        dispatch(authStart());
        const idToken = localStorage.getItem('idToken');
        if (idToken) {
            const expirationTime = new Date(localStorage.getItem('expiresIn'));
            if (new Date() > expirationTime) {
                dispatch(logout());
                dispatch(autoAuthFailure());
            } else {
                const expiresIn = (expirationTime - new Date().getTime()) / 1000;
                const data = {
                    idToken: idToken,
                    localId: localStorage.getItem('userId'),
                    expiresIn: expiresIn
                };
                dispatch(autoAuthSuccess(data, false));
                dispatch(setAuthTimeout(expiresIn));
            }
        } else {
            dispatch(autoAuthFailure())
        }
    }
}
