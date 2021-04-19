import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
import { useSelector } from 'react-redux';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const Buildcontrols = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(control =>
                <BuildControl key={control.label} label={control.label}
                    add={() => props.addIngredient(control.type)}
                    remove={() => props.removeIngredient(control.type)}
                    disabled={props.disabledInfo[control.type]}
                ></BuildControl>
            )}
            <button className={classes.OrderButton}
                disabled={!props.isPurchasable}
                onClick={props.ordered}>
                {props.isAuthenticated ? 'Order Now!' : 'Sign in to Order!'}</button>
        </div>
    )
};

export default Buildcontrols;
