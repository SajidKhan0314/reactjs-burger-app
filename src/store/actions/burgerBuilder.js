import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const setIngredientsStart = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_START,
    }
}

export const setBurgerBuildingState = () => {
    return {
        type: actionTypes.SET_BURGER_BUILDING_STATE
    }
}

export const updateBurgerBuildingState = () => {
    return {
        type: actionTypes.UPDATE_BURGER_BUILDING_STATE
    }
}

export const fetchIngredientsSuccess = ingredients => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        initIngredients: ingredients
    }
}

export const fetchIngredientsFailure = error => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILURE,
        error: error
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        dispatch(setIngredientsStart());
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(fetchIngredientsSuccess(response.data));
            })
            .catch(error =>
                dispatch(fetchIngredientsFailure(error))
            );
    }
}

export const addIngredient = ingredientType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingredientType
    }
}

export const subtractIngredient = ingredientType => {
    return {
        type: actionTypes.SUBTRACT_INGREDIENT,
        ingredientType: ingredientType
    }
}
