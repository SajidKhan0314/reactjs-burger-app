export const updateObject = (oldState, newObject) => {
    return {
        ...oldState,
        ...newObject
    }
}

export const validateInput = (inputValue, validations, shouldValidate) => {
    if (!shouldValidate) {
        return true;
    }
    let validity = true;

    if (validations.required) {
        validity = inputValue.trim() !== '' && validity;
    }

    if (validations.minLength) {
        validity = inputValue.length >= validations.minLength && validity;
    }

    if (validations.maxLength) {
        validity = inputValue.length <= validations.maxLength && validity;
    }
    if (validations.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        validity = pattern.test(inputValue) && validity
    }

    if (validations.isNumeric) {
        const pattern = /^\d+$/;
        validity = pattern.test(inputValue) && validity
    }

    return validity;
}

export const validateForm = (orderFormData) => {
    let validity = true;

    for (let input in orderFormData) {
        validity = orderFormData[input].validity != null && orderFormData[input].validity && validity;
    }

    return validity;
}
