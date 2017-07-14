// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr

import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { SideMenuButton } from 'containers';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import I18n from 'utils/i18n';

import {
    Home,
    FeedScreen,
    FeedSettingsScreen,
    LoginScreen,
    ProfileScreen,
    RepositoryScreen,
    AboutScreen,
    AccountIssues,
    AccountPullRequests,
    SideMenu,
    HomeHeaderRight
} from 'containers';

export const HomeScreeDrawer = DrawerNavigator({
    Home: {
        // screen: Home
        screen: FeedScreen
    },
}, {
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent: props => <SideMenu />,
    initialRouteName: 'Home'
})


export const AppNavigator = StackNavigator(
    {
        Home: {
            screen: HomeScreeDrawer,
            navigationOptions: {
                headerLeft: <SideMenuButton />,
                headerRight: <HomeHeaderRight />
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        FeedSettings: {
            screen: FeedSettingsScreen,
            navigationOptions: {
                title: 'Feed Settings'
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                title: 'Profile'
            },
        },
        Repository: {
            screen: RepositoryScreen,
            navigationOptions: {
                title: 'Repository',
            },
        },
        AccountIssues: {
            screen: AccountIssues,
            navigationOptions: {
                title: I18n.t('AccountIssues.Title'),
            },
        },
        AccountPullRequests: {
            screen: AccountPullRequests,
            navigationOptions: {
                title: I18n.t('AccountPullRequests.Title'),
            },
        },
        AboutScreen: {
            screen: AboutScreen,
            navigationOptions: {
                title: 'About',
            },
        },
    },
    {
        cardStyle: {
            backgroundColor: 'white'
        }
    }
);

class AppWithNavigationState extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const { dispatch, navigation } = this.props;

            if (navigation.index === 0) {
                return false;
            }
                
            dispatch(NavigationActions.back());

            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <AppNavigator navigation={ addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.navigation,
            }) } />
        );
    }
}

const mapStateToProps = state => ({
    navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
