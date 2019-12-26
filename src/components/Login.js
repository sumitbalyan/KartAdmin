import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, 
    Image, ImageBackground, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BACKGROUND, PRIMARY } from '../assets/styles/colors';
import AdminImage from '../assets/images/admin.png';
import Background from '../assets/images/background.jpg';

const {width : WIDTH} = Dimensions.get('window');

const Login = () => {
    const [state, setstate] = useState({showpass:true,press : false});

    const handlePass = ()=> {
        if(!state.press){
            setstate({showpass : false, press : true});
        }
        else {
            setstate({showpass : true, press : false});
        }

    }

    return (
        <>
        <StatusBar backgroundColor = {PRIMARY} />
        <ImageBackground source = {Background} style = {styles.backgroundContainer}>
            <SafeAreaView>
                
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
                            />
                        <TouchableOpacity style = {styles.btnEye} onPress = {handlePass}>
                            <Icon name = {state.press ? 'ios-eye-off' : 'ios-eye'} size = {26} color = {'rgba(255,255,255,0.7)'} />
                        </TouchableOpacity>    
                    </View>
                    <View style = {styles.loginContainer}>
                        <TouchableOpacity style = {styles.btnLogin}>
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