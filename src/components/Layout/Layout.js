import { Component } from 'react';
import Auxiliary from '../Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar toggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer toggleClicked={this.sideDrawerToggleHandler} opened={this.state.showSideDrawer} />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary >
        );
    };
}

export default Layout;
