import { postAuth } from './apis';
import {AsyncStorage} from 'react-native';
import { StackActions } from 'react-navigation';

const baseurl = 'api/v1/users';
        
const login = async (email,password)=> {
    const burl = process.env.BASEURL;
    console.log('burl',burl);
    const userData = await postAuth({email, password}, baseurl);
    if(userData.token){
        await AsyncStorage.setItem('userToken', userData.token);
    }
    return userData.user;
}

export const logout = async (navigation)=>{
    await AsyncStorage.clear();
    navigation.navigate('Auth');
}

export const userAuth =  {
    login,
    logout
}


