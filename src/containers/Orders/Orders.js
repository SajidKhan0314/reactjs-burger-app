import { Component } from 'react';
import Order from '../../components/Order/Order';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Orders.module.css';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (this.props.error) {
            orders = <p className="ErrorTab">{this.props.error}</p>;
        }
        if (!this.props.isLoading && !this.props.error) {
            orders = <p className={classes.NoOrderTab}>No orders yet!</p>;
            if (this.props.orders.length > 0) {
                orders = this.props.orders.map(
                    order =>
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.totalPrice}
                        />
                )
            }
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        error: state.order.error,
        idToken: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (idToken, userId) => dispatch(actions.fetchOrders(idToken, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

