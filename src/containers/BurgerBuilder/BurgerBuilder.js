import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.setIngredients();
        this.props.setBuildingState();
    }

    getPurchasableStatue = (updatedIngredients) => {
        const totalIngredients = Object.keys(updatedIngredients)
            .map(key => updatedIngredients[key])
            .reduce((updatedTotalIngredients, ingredientAmount) => { return updatedTotalIngredients + ingredientAmount }, 0);
        return totalIngredients > 0;
    }

    addIngredientHandler = type => {
        this.props.onAddIngredient(type);
        this.props.onUpdateBuildingState();
    }

    removeIngredientHandler = type => {
        this.props.onSubtractIngredient(type);
        this.props.onUpdateBuildingState();
    }

    purchaseHandler = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth');
        }
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: "/checkout",
        });
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burgerBuilder = !this.props.error ?
            <Spinner /> :
            <p>There is something wrong with the server!</p>;

        if (this.props.ingredients) {
            burgerBuilder = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        ordered={this.purchaseHandler}
                        totalPrice={this.props.totalPrice}
                        isPurchasable={this.getPurchasableStatue(this.props.ingredients)}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
            />;
            if (this.props.isLoading) {
                orderSummary = <Spinner />;
            }
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burgerBuilder}
            </Auxiliary>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isLoading: state.burgerBuilder.isLoading,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken != null,
        buildingState: state.burgerBuilder.buildingState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setIngredients: () => dispatch(actions.fetchIngredients()),
        setBuildingState: () => dispatch(actions.setBurgerBuildingState()),
        onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onSubtractIngredient: (ingredientType) => dispatch(actions.subtractIngredient(ingredientType)),
        onInitPurchase: () => dispatch(actions.initPurchase()),
        onUpdateBuildingState: () => dispatch(actions.updateBurgerBuildingState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
