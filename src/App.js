import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncComponent } from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';
import './App.module.css'

const chekcoutComponent = asyncComponent(() => import('./containers/Checkout/Checkout'));
const authComponent = asyncComponent(() => import('./containers/Auth/Auth'));
const ordersComponent = asyncComponent(() => import('./containers/Orders/Orders'));


class App extends Component {
  componentDidMount() {
    this.props.autoAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={authComponent} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={chekcoutComponent} />
          <Route path="/orders" exact component={ordersComponent} />
          <Route path="/auth" exact component={authComponent} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <BrowserRouter basename="/reactjs-burger-app">
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuth: () => dispatch(actions.autoAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
