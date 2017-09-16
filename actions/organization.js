// @flow

import { executeGraphQL } from 'github-flow-js';
import { ORGANIZATION_REQUEST } from 'constants';
import { makeThunk } from 'utils/action-helper';

const getOrganizationQL = `
query($login: String!) {
    organization(login: $login) {
        name
        avatarUrl
        description
        repositories {
            totalCount
        }
        pinnedRepositories(first: 6) {
            edges {
                node {
                    name
                    description
                    primaryLanguage {
                        name
                        color
                    }
                    stargazers {
                        totalCount
                    }
                    forks {
                        totalCount
                    }
                }
            }
        }
    }
}
`;

export function fetchOrganization(login: string): ThunkAction {
    return makeThunk(
        async () => {
            const result = await executeGraphQL(getOrganizationQL, { login });

            return result.organization;
        },
        ORGANIZATION_REQUEST
    );
}
