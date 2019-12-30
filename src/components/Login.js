import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, 
    Image, ImageBackground, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { userAuth } from '../services';
import Icon from 'react-native-vector-icons/Ionicons';
import { BACKGROUND, PRIMARY } from '../assets/styles/colors';
import AdminImage from '../assets/images/admin.png';
import Background from '../assets/images/background.jpg';
import { Toast, Email } from '../utils/';
import Loader from './Loader';

const {width : WIDTH} = Dimensions.get('window');

const Login = (props) => {
    const [state, setstate] = useState(
                {
                    showpass:true,
                    press : false, 
                    indicator : false,
                    email: '',
                    password : ''
                }
            );

    const handlePass = ()=> {
        if(!state.press){
            setstate({showpass : false, press : true});
        }
        else {
            setstate({showpass : true, press : false});
        }

    }

    const _SignInAsync = async ()=>{
        if(state.email === ''){
            Toast.show('enter the email.');
        }
        else if(state.password === ''){
            Toast.show('enter the password.');
        }
        else if(!Email.validateEmail(state.email)){
            Toast.show('enter the valid email.');
        }
        else {
            setstate({...state, indicator : true});
            const userData = await userAuth.login(state.email, state.password);
            if(userData.token !== undefined){
                setstate({...state, indicator : false});
                props.navigation.navigate('App');
            }
            else{
                setstate({...state, indicator : false});
                Toast.show(userData.message);
                userAuth.logout(props.navigation);
            }
            
        }
        
    }

    return (
    <>
        <StatusBar backgroundColor = {PRIMARY} />
        
        <ImageBackground source = {Background} style = {styles.backgroundContainer}>
            <SafeAreaView>
                    <Loader loading = {state.indicator} />
                    <View style = {styles.logoContainer}> 
                        <Image source = {AdminImage} style = {styles.logo} />
                        <Text style = {styles.logoText}>Admin Kart</Text>
                    </View>
                    <View style = {styles.inputContainer} >
                        <Icon name = {'ios-mail'} size = {28} color = {'rgba(255,255,255,0.7)'} style = {styles.inputIcon} />
                        <TextInput 
                            style = {styles.input}
                            placeholder = {'Email'}
                            placeholderTextColor = {'rgba(255,255,255,0.7)'}
                            underlineColorAndroid = 'transparent'
                            onChangeText = {(text)=> setstate({...state, email:text}) }
                            />
                    </View>
                    <View style = {styles.inputContainer}>
                        <Icon name = {'ios-lock'} size = {28} color = {'rgba(255,255,255,0.7)'} style = {styles.inputIcon} />
                        <TextInput 
                            style = {styles.input}
                            placeholder = {'Password'}
                            secureTextEntry = {state.showpass}
                            placeholderTextColor = {'rgba(255,255,255,0.7)'}
                            underlineColorAndroid = 'transparent'
                            onChangeText = {(text)=> setstate({...state, password:text}) }
                            />
                        <TouchableOpacity style = {styles.btnEye} onPress = {handlePass}>
                            <Icon name = {state.press ? 'ios-eye-off' : 'ios-eye'} size = {26} color = {'rgba(255,255,255,0.7)'} />
                        </TouchableOpacity>    
                    </View>
                    <View style = {styles.loginContainer}>
                        <TouchableOpacity style = {styles.btnLogin} onPress = {_SignInAsync}>
                            <Text style = {styles.btnText}>Login</Text>
                        </TouchableOpacity>             
                    </View>
            </SafeAreaView>
        </ImageBackground>
    </>
    )
}

const styles = StyleSheet.create({
    backgroundContainer : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        height : null,
        width : null,
        backgroundColor : BACKGROUND
    },
    logo : {
        height : 100,
        width : 100
    },
    logoContainer : {
        alignItems : "center",
        marginBottom : 50
    },
    logoText : {
        color : "white",
        fontSize : 20,
        fontWeight : "500",
        fontStyle : "italic",
        opacity : 0.5,
        marginTop : 10
    },
    inputContainer : {
        marginTop : 10
    },
    input : {
        width : WIDTH - 55,
        height : 45,
        borderRadius : 25,
        fontSize : 16,
        paddingLeft : 45,
        color : 'rgba(255,255,255,0.7)',
        backgroundColor : 'rgba(0,0,0,0.35)',
        marginHorizontal : 25,
    },
    inputIcon : {
        position : 'absolute',
        top : 8,
        left : 37
    },
    btnEye : {
        position : 'absolute',
        top : 8,
        right : 37
    },
    loginContainer : {
        justifyContent : "center",
        alignItems : "center"
    },
    btnLogin : {
        width : WIDTH - 55,
        height : 45,
        borderRadius : 25,
        backgroundColor : '#432577',
        justifyContent : 'center',
        marginTop : 20,
    },
    btnText : {
        color : 'rgba(255,255,255,0.7)',
        fontSize : 16,
        textAlign : 'center',

    }

});

export default Login;