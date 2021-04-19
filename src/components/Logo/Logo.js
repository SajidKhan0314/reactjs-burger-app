import logoImage from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoImage} alt="MyBurger" />
    </div>
);

export default logo;
