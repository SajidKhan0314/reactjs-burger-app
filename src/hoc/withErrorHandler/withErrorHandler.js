import { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(
                request => {
                    this.setState({ error: null });
                    return request;
                },
                error => {
                    this.setState({ error: error.message });
                    return Promise.reject(error);
                });

            this.responseInterceptor = axios.interceptors.response.use(
                response => response,
                error => {
                    this.setState({ error: error.message });
                    return Promise.reject(error);
                });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        closeErrorModalHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        closeModal={this.closeErrorModalHandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;
