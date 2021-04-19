import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import { useSelector } from 'react-redux';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>I hope it tastes well!</h1>
            <Burger ingredients={props.ingredients} />
            <p>Total price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.orderCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.orderContinued}>Continue</Button>
        </div>
    );
}

export default CheckoutSummary;
