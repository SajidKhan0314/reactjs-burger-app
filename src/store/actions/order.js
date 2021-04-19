import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
    }
}

export const purchaseBurgerFailure = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    }
}

export const purchaseBurger = (order, idToken) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + idToken, order)
            .then(response => {
                dispatch(purchaseBurgerSuccess());
            })
            .catch(error => {
                dispatch(purchaseBurgerFailure(error.message));
            });
    }
}

export const setOrdersStart = () => {
    return {
        type: actionTypes.SET_ORDERS_START
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error: error
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}


export const fetchOrders = (idToken, userId) => {
    return dispatch => {
        dispatch(setOrdersStart());
        axios.get('/orders.json?auth=' + idToken + '&orderBy="userId"&equalTo="' + userId + '"')
            .then(response => {
                let orders = [];
                for (let orderKey in response.data) {
                    orders.push({
                        id: orderKey,
                        ingredients: response.data[orderKey].ingredients,
                        totalPrice: response.data[orderKey].price
                    })
                }
                dispatch(fetchOrdersSuccess(orders));
            }).catch(error => {
                dispatch(fetchOrdersFailure(error.message))
            });
    };
}
