import React, { Component } from 'react';

export const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(importedComponent => {
                    this.setState({ component: importedComponent.default })
                });
        }

        render() {
            const ImportedComponent = this.state.component;
            return ImportedComponent ? <ImportedComponent {...this.props} /> : null;
        }
    }
}
