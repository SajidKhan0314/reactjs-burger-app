import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    idToken: null,
    userId: null,
    expiresIn: null,
    isLoading: false,
    error: null,
    signUpSuccess: null
};

const authStart = (state, action) => {
    return updateObject(state, { isLoading: true, error: null, signUpSuccess: null });
}

const autoAuthSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        expiresIn: action.expiresIn,
        isLoading: false,
    });
}

const autoAuthFailure = (state, action) => {
    return updateObject(state, { isLoading: false });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        expiresIn: action.expiresIn,
        isLoading: false,
        signUpSuccess: action.isSignUp ? "Account created successfully!" : null
    });
}

const authFailure = (state, action) => {
    return updateObject(state, { isLoading: false, error: action.error });
}

const logout = (state, action) => {
    return updateObject(state, { idToken: null, userId: null, expiresIn: null });
}

const clearMessages = (state, action) => {
    return updateObject(state, { error: null, signUpSuccess: null });
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTO_AUTH_SUCCESS: return autoAuthSuccess(state, action);
        case actionTypes.AUTO_AUTH_FAILURE: return autoAuthFailure(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILURE: return authFailure(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.CLEAR_MESAGES: return clearMessages(state, action);
        default: return state;
    }
}

export default auth;
