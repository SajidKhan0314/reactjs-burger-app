import classes from './Modal.module.css';
import { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(prevProps, prevState) {
        return prevProps.show !== this.props.show || prevProps.children !== this.props.children;
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.closeModal} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? 1 : 0
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;
