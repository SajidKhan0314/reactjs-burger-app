import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isLoading: false,
    error: null,
    purchased: false,
    orders: []
};

const setOrdersStart = (state, action) => {
    return updateObject(state, { isLoading: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { isLoading: false, orders: action.orders });
}

const fetchOrdersFailure = (state, action) => {
    return updateObject(state, { isLoading: false, error: action.error });
}

const initPurchase = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { isLoading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    return updateObject(state, { isLoading: false, error: null, purchased: true });
}

const purchaseBurgerFailure = (state, action) => {
    return updateObject(state, { isLoading: false, error: action.error });
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS_START:
            return setOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILURE:
            return fetchOrdersFailure(state, action);
        case actionTypes.INIT_PURCHASE:
            return initPurchase(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return purchaseBurgerFailure(state, action);
        default:
            return updateObject(state);
    }
}

export default orderReducer;
