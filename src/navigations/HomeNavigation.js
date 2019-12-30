import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground, SafeAreaView, StatusBar, Button } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../components/Home';
import Users from '../components/Users';
import Products from '../components/Products';
import Roles from '../components/Roles';
import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundImage from '../assets/images/background.jpg';
import { createStackNavigator } from 'react-navigation-stack';
import { PRIMARY } from '../assets/styles/colors';
import Login from '../components/Login';
import { userAuth } from '../services';

const { width : WIDTH} = Dimensions.get('window');

const HomeNavigation = () => {
    const AppContainer = createAppContainer(createSwitchNavigator({
        Home : HomeDrawer,
        Auth : Login,
       
    },
    {
        initialRouteName : 'Home'
    }
    ));
    return (
        <AppContainer />
    )
}

const CustomDrawerComponent = (props)=> (
    <ImageBackground style = {styles.drawerView} source = {BackgroundImage}>
        <StatusBar barStyle = "light-content" backgroundColor = {PRIMARY} />
        <SafeAreaView style = {styles.containerSafeAreaView}>
            <View style= {styles.drawerUserView}>
                <Icon name = 'ios-contact' size = {100} color = "#858585" />
                <Text style = {styles.text}>Hi admin!</Text>
            </View>
            <View style={styles.devider} />
            <ScrollView>
                <DrawerItems {...props} />
                <Button color = {'red'} title="Logout" onPress={userAuth.logout(props.navigation)}/>
            </ScrollView>
        </SafeAreaView>
    </ImageBackground>
);

const HomeStackNavigator = createStackNavigator({
        Home : {
            screen : Home,
            navigationOptions : ({navigation})=>{
                return {
                        headerTitle : <Text style = {styles.text}>Home</Text>,
                        headerStyle : {
                            backgroundColor : PRIMARY
                        },
                        headerLeft : <Icon style={{paddingLeft: 5 }} color = "white" name="ios-menu" size={35} onPress={ () => navigation.openDrawer() } />
            }
        }
    }
});

const UsersStackNavigator = createStackNavigator({
    Users : {
        screen : Users,
        navigationOptions : ({navigation})=>{
            return {
                headerTitle : <Text style = {styles.text}>Users</Text>,
                headerStyle : {
                    backgroundColor : PRIMARY
                },
                headerLeft: <Icon style={{paddingLeft: 5 }} color = "white" name="ios-menu" size={35} onPress={ () => navigation.openDrawer() } />
        }
    }
}
});

const ProductStackNavigator = createStackNavigator({
    Products : {
        screen : Products,
         navigationOptions : ({navigation})=>{
            return  {
                headerTitle : <Text style = {styles.text}>Products</Text>,
                headerStyle : {
                    backgroundColor : PRIMARY
                },
                headerLeft: <Icon style={{paddingLeft: 5 }} color = "white" name="ios-menu" size={35} onPress={ () => navigation.openDrawer() } />
            }
        }
    }
});

const RolesStackNavigator = createStackNavigator({
    Roles : {
        screen : Roles,
         navigationOptions : ({navigation})=>{
            return {
                headerTitle : <Text style = {styles.text}>Roles</Text>,
                headerStyle : {
                    backgroundColor : PRIMARY
                },
                headerLeft: <Icon style={{paddingLeft: 5 }} color = "white" name="ios-menu" size={35} onPress={ () => navigation.openDrawer() } />
            }
        }
    }
});

const HomeDrawer = createDrawerNavigator({
    Home : {
        screen : HomeStackNavigator,
        navigationOptions : {
            drawerIcon : ({tintColor})=> <Icon name = "ios-home" color = {tintColor} size = {24} />,    
        }
},
    Users : {
        screen : UsersStackNavigator,
        navigationOptions : {
            drawerIcon : ({tintColor})=> <Icon name = "ios-person" color = {tintColor} size = {24} />,    
        }
},
    Products : {
        screen : ProductStackNavigator,
        navigationOptions : {
            drawerIcon : ({tintColor})=> <Icon name = "ios-cube" color = {tintColor} size = {24} />,    
        }
},
    Roles : {
        screen : RolesStackNavigator,
        navigationOptions : {
            drawerIcon : ({tintColor})=> <Icon name = "ios-people" color = {tintColor} size = {24} />,    
        }
}
},{ 
    contentComponent : CustomDrawerComponent,
    contentOptions : {
        activeTintColor : "orange",
        inactiveTintColor : "white"
    },
    drawerWidth : (WIDTH / 3) * 2,
}
);

const styles = StyleSheet.create({
    drawerView : {
        flex :1,
        width : null,
        height : null,
        paddingLeft : 5
    },
    drawerUserView : {
        height : 120,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        color : "white",
        fontSize : 20,
        fontWeight : "500",
        fontStyle : "italic",
        opacity : 0.5
    },
    devider : {
        width: '100%',
        height: 1,
        backgroundColor: 'white',
        marginTop: 15,
        opacity : 0.5
    },
    containerSafeAreaView : {
        marginLeft : 5,
        marginRight : 5
    }
});

export default HomeNavigation;
