import * as errorTypes from '../actions/errorTypes';

export const getErrorMessage = (errorType) => {
    console.log(errorType);
    switch (errorType) {
        case errorTypes.EMAIL_EXISTS: return "The email address is already in use by another account.";
        case errorTypes.OPERATION_NOT_ALLOWED: return "Password sign-in is disabled for this project.";
        case errorTypes.TOO_MANY_ATTEMPTS_TRY_LATER: return "We have blocked all requests from this device due to unusual activity. Try again later.";
        case errorTypes.EMAIL_NOT_FOUND: return "There is no user record corresponding to this identifier. The user may have been deleted.";
        case errorTypes.INVALID_PASSWORD: return "The password is invalid or the user does not have a password.";
        case errorTypes.USER_DISABLED: return "The user account has been disabled by an administrator.";
        default: return errorType;
    }
}
