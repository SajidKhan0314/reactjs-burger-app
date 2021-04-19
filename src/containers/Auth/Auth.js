import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getErrorMessage } from '../../store/reducers/errors';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, validateInput, validateForm } from '../../shared/utility';


class Auth extends Component {
    state = {
        authForm: {
            email: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'email',
                    label: 'Email Address',
                    placeholder: 'Email',
                },
                shouldValidate: true,
                validations: {
                    required: true,
                    isEmail: true
                },
                validity: false,
                touched: false
            },
            password: {
                value: '',
                configurations: {
                    inputType: 'input',
                    dataType: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                },
                shouldValidate: true,
                validations: {
                    required: true,
                    minLength: 6,
                },
                validity: false,
                touched: false
            }
        },
        formValidity: false,
        isSignUp: true
    }

    componentDidMount() {
        this.props.onClearMessages();
    }

    inputChangeHandler = (event, inputType) => {
        const updatedAuthForm = updateObject({ ...this.state.authForm }, {
            [inputType]: updateObject({ ...this.state.authForm[inputType] }, {
                value: event.target.value,
                validity: validateInput(
                    event.target.value,
                    this.state.authForm[inputType].validations,
                    this.state.authForm[inputType].shouldValidate
                ),
                touched: true
            })
        });
        const formValidity = validateForm(updatedAuthForm);
        this.setState({ formValidity: formValidity });
        this.setState({ authForm: updatedAuthForm });
    }

    onAuthHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(oldState => {
            return { isSignUp: !this.state.isSignUp }
        });
    }

    resetState = () => {
        const updatedAuthForm = { ...this.state.authForm };
        for (let authFormInput in updatedAuthForm) {
            updatedAuthForm[authFormInput] = {
                ...updatedAuthForm[authFormInput],
                value: ''
            }
        }
        this.setState({ authForm: updatedAuthForm });
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key],
            })
        }

        let formInputs = formElementsArray.map(
            input => {
                return <Input
                    key={input.id}
                    value={input.config.value}
                    changed={(event) => this.inputChangeHandler(event, input.id)}
                    {...input.config.configurations}
                    valid={input.config.validity}
                    shouldValidate={input.config.shouldValidate}
                    isTouched={input.config.touched}
                />
            }
        );

        let message = null;

        if ((this.props.error || this.props.success) && !this.props.isLoading) {
            if (this.props.error) {
                const errorMessage = this.props.error.response.data.error.message ?
                    getErrorMessage(this.props.error.response.data.error.message) :
                    this.props.error.message;
                message = <p className="ErrorTab">{errorMessage}</p>;
            }
            if (this.props.success) {
                message = <p className="SuccessTab">{this.props.signUpSuccess}</p>;
            }
        }

        const redirectPath = this.props.isBuildingBurger ? "/checkout" : "/";

        const redirect = this.props.isAuthenticated ? <Redirect to={redirectPath} /> : null;

        let form = (
            <form onSubmit={this.onAuthHandler}>
                <h3>{this.state.isSignUp ? 'Sign Up' : 'Sing In'}</h3>
                {formInputs}
                <Button btnType="Success" disabled={!this.state.formValidity}>
                    {this.state.isSignUp ? 'Sign Up' : 'Sing In'}
                </Button>
            </form>
        );

        if (this.props.isLoading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.Form}>
                {redirect}
                {form}
                <Button btnType="Alt" clicked={this.switchAuthModeHandler}>Switch To {this.state.isSignUp ? 'Sign In' : 'Sing Up'}
                </Button>
                {message}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        signUpSuccess: state.auth.signUpSuccess,
        isAuthenticated: state.auth.idToken != null,
        isBuildingBurger: state.burgerBuilder.buildingState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onClearMessages: () => dispatch(actions.clearMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
