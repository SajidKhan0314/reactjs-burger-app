import { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './ContactOrder.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { purchaseBurger } from '../../../store/actions/index';
import { updateObject, validateInput, validateForm } from '../../../shared/utility';

class ContactOrder extends Component {

    state = {
        orderForm: {
            name: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'text',
                    label: 'Full Name',
                    placeholder: 'Name',
                },
                validations: {
                    required: true,
                    minLength: 3,
                },
                shouldValidate: true,
                validity: false,
                touched: false
            },
            email: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'email',
                    label: 'Email',
                    placeholder: 'Email',
                },
                validations: {
                    required: true,
                    isEmail: true
                },
                shouldValidate: true,
                validity: false,
                touched: false
            },
            country: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'text',
                    label: 'Country',
                    placeholder: 'Country',
                },
                validations: {
                    required: true,
                    minLength: 3
                },
                shouldValidate: true,
                validity: false,
                touched: false
            },
            city: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'text',
                    label: 'City',
                    placeholder: 'City',
                },
                validations: {
                    required: true,
                    minLength: 3
                },
                shouldValidate: true,
                validity: false,
                touched: false
            },
            zip: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'text',
                    label: 'Zip Code',
                    placeholder: 'Zip Code',
                },
                validations: {
                    required: true,
                    minLength: 3,
                    maxLength: 8
                },
                shouldValidate: true,
                validity: false,
                touched: false
            },
            deliveryMethod: {
                value: 'fastest',
                configurations: {
                    inputType: 'select',
                    label: 'Delivery Method',
                    options: [
                        { value: 'fastest', display: 'Fastest' },
                        { value: 'cheapest', display: 'Cheapest' },
                    ]
                },
                shouldValidate: false,
                validity: true
            },
        },
        formValidity: false,
    }

    completeOrder = (event) => {
        event.preventDefault();

        let orderFormData = {};
        for (let field in this.state.orderForm) {
            orderFormData[field] = this.state.orderForm[field].value;
        }

        const order = {
            orderData: orderFormData,
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            userId: this.props.userId
        };

        this.props.onCompleteOrder(order, this.props.idToken);
    }

    inputChangeHandler = (event, inputType) => {
        const updatedOrderForm = updateObject({ ...this.state.orderForm },
            {
                [inputType]: updateObject({ ...this.state.orderForm[inputType] }, {
                    value: event.target.value,
                    validity: validateInput(
                        event.target.value,
                        this.state.orderForm[inputType].validations,
                        this.state.orderForm[inputType].shouldValidate
                    ),
                    touched: true
                }),
            }
        );

        const formValidity = validateForm(updatedOrderForm);
        this.setState({ formValidity: formValidity });
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        let formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key],
                }
            );
        }

        const formInputs = formElementsArray.map(
            inputKey => {
                return <Input
                    key={inputKey.id}
                    value={inputKey.config.value}
                    changed={(event) => this.inputChangeHandler(event, inputKey.id)}
                    {...inputKey.config.configurations}
                    valid={inputKey.config.validity}
                    shouldValidate={inputKey.config.shouldValidate}
                    isTouched={inputKey.config.touched}
                />
            }
        );

        let form = (
            <form className={classes.Form}>
                <h1>Order form</h1>
                {formInputs}
                <Button btnType="Success" clicked={this.completeOrder} disabled={!this.state.formValidity}>Order</Button>
            </form>
        );

        if (this.props.isLoading) {
            form = <Spinner />;
        }

        let error = this.props.error ? <p className="ErrorTab">{this.props.error}</p> : null;

        return (
            <Auxiliary>
                {form}
                {error}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isLoading: state.order.isLoading,
        error: state.order.error,
        userId: state.auth.userId,
        idToken: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCompleteOrder: (orderInfor, idToken) => dispatch(purchaseBurger(orderInfor, idToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactOrder, axios)));
