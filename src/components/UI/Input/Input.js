import classes from './Input.module.css';

const input = props => {
    let inputElement = null;

    let appliedClasses = [classes.InputElement];

    if (props.shouldValidate && props.isTouched && !props.valid) {
        appliedClasses.push(classes.InvalidInput);
    }

    switch (props.inputType) {
        case 'input':
            inputElement = <input
                className={appliedClasses.join(' ')}
                type={props.dataType}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea
                className={appliedClasses.join(' ')}
                type={props.dataType}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'select':
            inputElement = (
                <select className={appliedClasses.join(' ')} value={props.value} onChange={props.changed} >
                    {
                        props.options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.display}
                                </option>
                            );
                        }
                        )
                    }
                </select>
            );
            break;
        default:
            inputElement = <input
                className={appliedClasses.join(' ')}
                type={props.dataType}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed} />
            break;
    }

    return (
        <div className={classes.Input}>
            <p className={classes.InputLabel}>{props.label}</p>
            {inputElement}
        </div>
    );
}

export default input;
