// @flow

import {
    ORGANIZATION_REQUEST,
    ORGANIZATION_REQUEST_FAIL,
    ORGANIZATION_REQUEST_SUCCESS
} from 'constants';

// import flow types
import type { OrganizationEntity } from 'github-flow-js';

export type OrganizationState = {
    loading: boolean,
    error:? Error,
    organization:? OrganizationEntity
}

const initialState: OrganizationState = {
    loading: false,
    error: null,
    organization: null
};

export default (state: OrganizationState = initialState, action: Action): OrganizationState => {
    switch (action.type) {
        case ORGANIZATION_REQUEST:
            return {
                ...state,
                organization: null,
                loading: true,
                error: null
            };
        case ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                organization: action.payload
            };
        case ORGANIZATION_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                organization: action.error
            };
        default:
            return state;
    }
};
