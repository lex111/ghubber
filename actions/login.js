// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { showHome } from './navigation';
import { encode } from 'base-64';
import { createAuthorization, getUser } from 'github-flow-js';

import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAIL,
    LOGIN_REQUEST_SUCCESS,
    APP_PROFILE_SUCCESS
} from 'constants';

// import flow types
import type { AuthorizationEntity } from 'github-flow-js';

export function makeLogin(username: string, password: string, code: string) {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })

        const options = {
            headers: {
                Authorization: 'Basic ' + encode(username + ':' + password)
            }
        };

        const now = new Date();

        const promise = createAuthorization(
            {
                note: 'Ghubber ' + now
            },
            options
        );

        promise.then(
            (response: AuthorizationEntity) => {
                dispatch({
                    type: LOGIN_REQUEST_SUCCESS,
                    payload: response
                });

                const options = {
                    headers: {
                        Authorization: 'Token ' + response.token
                    }
                };

                const promise = getUser({}, options);

                promise.then(
                    (response) => {
                        dispatch({
                            type: APP_PROFILE_SUCCESS,
                            payload: response
                        });

                        dispatch(showHome());
                    },
                    (err) => {
                        console.warn(err);

                        dispatch({
                            type: LOGIN_REQUEST_FAIL
                        })
                    }
                )
            },
            (err) => {
                console.warn(err);

                dispatch({
                    type: LOGIN_REQUEST_FAIL
                })
            }
        )
    }
}

