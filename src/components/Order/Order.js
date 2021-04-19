import classes from './Order.module.css';

const order = props => {
    let ingredients = Object.keys(props.ingredients).map(ingKey => {
        return <span
            style={{
                textTransform: 'capitalize',
                border: '1px solid gray',
                padding: '0 3px',
                margin: '0 3px'
            }}
            key={ingKey}>{ingKey} ({props.ingredients[ingKey]})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredirents: {ingredients}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;

