// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { default as Navigator } from './Navigator'
import { configureStore, getInitialState } from 'utils';

type State = {
    initialized: boolean,
    error: boolean,
    preloadedState: Object|null
}

class App extends Component<State, void, void> {
    state = {
        initialized: false,
        error: false,
        preloadedState: null
    }

    componentWillMount() {
        getInitialState().then(
            (state) => {
                this.setState({
                    initialized: true,
                    preloadedState: state
                })
            },
            (error) => {

            }
        )
    }

    render() {
        if (!this.state.initialized) {
            return null;
        }

        if (this.state.error) {
            return null;
        }

        const store = configureStore(this.state.preloadedState);

        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ghubber', () => App);
