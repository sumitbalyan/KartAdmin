import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './HomeNavigation';
import Login from '../components/Login';
import AuthLoading from '../components/AuthLoading';
 
export default createAppContainer(
    createSwitchNavigator({
        AuthLoading : AuthLoading,
        App : Home,
        Auth : Login
    },
    {
        initialRouteName : 'AuthLoading'
    })
);
