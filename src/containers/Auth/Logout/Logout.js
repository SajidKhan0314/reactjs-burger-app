import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        const redirect = this.props.isAuthenticated ? null : <Redirect to="/" />;
        return redirect;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.IdToken != null,
        token: state.auth.IdToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
