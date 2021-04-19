import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    isPurchasable: false,
    isLoading: false,
    error: null,
    buildingState: false
}

const INGREDIENTS_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    cheese: 0.7,
    meat: 1.2
}

const setIngredientsStart = (state, action) => {
    return updateObject(state, { ingredients: null, isLoading: true });
}

const setBurgerBuildingState = (state, action) => {
    return updateObject(state, { buildingState: false });
}

const updateBurgerBuildingState = (state, action) => {
    let totalIngredients = 0;
    for (let ingredient in state.ingredients) {
        totalIngredients += state.ingredients[ingredient];
    }
    return updateObject(state, { buildingState: totalIngredients > 0 });
}

const fetchIngredientsSuccess = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.initIngredients.salad,
            bacon: action.initIngredients.bacon,
            cheese: action.initIngredients.cheese,
            meat: action.initIngredients.meat
        },
        isLoading: false,
        totalPrice: 2
    });
}

const fetchIngredientsFailure = (state, action) => {
    return updateObject(state, { error: action.error, isLoading: false });
}

const addIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientType]
    });
}

const subtractIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientType]
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_INGREDIENTS_START:
            return setIngredientsStart(state, action);
        case actionType.SET_BURGER_BUILDING_STATE:
            return setBurgerBuildingState(state, action);
        case actionType.UPDATE_BURGER_BUILDING_STATE:
            return updateBurgerBuildingState(state, action);
        case actionType.FETCH_INGREDIENTS_SUCCESS:
            return fetchIngredientsSuccess(state, action);
        case actionType.FETCH_INGREDIENTS_FAILURE:
            return fetchIngredientsFailure(state, action);
        case actionType.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionType.SUBTRACT_INGREDIENT:
            return subtractIngredient(state, action);
        default:
            return updateObject(state);
    }
}

export default reducer;
