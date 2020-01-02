import { postAuth } from './apis';
import {AsyncStorage} from 'react-native';

const baseurl = 'api/v1/users/adminlogin';
        
const login = async (email,password)=> {
    const burl = process.env.BASEURL;
   // alert(burl);
    const userData = await postAuth({email, password}, baseurl);
    if(userData && userData.token){
        await AsyncStorage.setItem('userDetail',JSON.stringify(userData));
    }

    return userData;
}
export const getUser = async () =>{
    const user = await AsyncStorage.getItem('userDetail');
    return JSON.parse(user);
}
export const logout = async (navigation)=>{
    await AsyncStorage.clear();
    navigation.navigate('Auth');
}

export const userAuth =  {
    login,
    logout,
    getUser
}


