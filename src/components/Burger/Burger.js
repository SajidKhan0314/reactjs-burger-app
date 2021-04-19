import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = props => {
    let ingredients = Object.keys(props.ingredients)
        .map(ingredientKey => [...Array(props.ingredients[ingredientKey])]
            .map((_, index) => (<BurgerIngredient key={ingredientKey + index} type={ingredientKey}></BurgerIngredient>)))
        .reduce((flattenedArray, el) => flattenedArray.concat(el), []);


    if (ingredients.length === 0) {
        ingredients = <p>Please start inserting ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
