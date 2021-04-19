import { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState(
            (prevState) => {
                return { showSideDrawer: !prevState.showSideDrawer }
            });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    toggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    toggleClicked={this.sideDrawerToggleHandler}
                    opened={this.state.showSideDrawer}
                    isAuth={this.props.isAuthenticated} />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary >
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken != null
    }
}

export default connect(mapStateToProps)(Layout);
