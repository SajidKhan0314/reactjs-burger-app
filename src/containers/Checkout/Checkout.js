import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactOrder from './ContactOrder/ContactOrder';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import { initPurchase } from '../../store/actions/index';

class Checkout extends Component {
    cancelOrderHandler = () => {
        this.props.history.replace('/');
    }

    continueOrderHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-order');
    }

    render() {
        let checkoutSummary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            checkoutSummary = (
                <Auxiliary>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        totalPrice={this.props.totalPrice}
                        orderCancelled={this.cancelOrderHandler}
                        orderContinued={this.continueOrderHandler} />
                    <Route path="/checkout/contact-order" exact component={ContactOrder} />
                </Auxiliary>
            )
        };
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
