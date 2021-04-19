import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if (props.opened) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.opened} clicked={props.toggleClicked} />
            <div className={sideDrawerClasses.join(' ')} onClick={props.toggleClicked} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    )
};

export default sideDrawer;
