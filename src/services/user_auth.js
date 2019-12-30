import { api, handleResponse } from './api';
import {AsyncStorage} from 'react-native';
const baseurl = 'api/v1/users';

const login = async (email, password) =>
    api.post(`${baseurl}/adminlogin`, {email, password})
        .then(handleResponse)
        .then( async (user) => {
            console.log(user)
            if(user.token){
                await AsyncStorage.set('userToken', user.token);
            }
            return user;
        })
        .catch(err=>{
            console.error(err);
            
        });
        

export const logout = async (navigation)=>{
    await AsyncStorage.clear();
    navigation.navigate('Auth');
}

export const userAuth =  {
    login,
    logout
}


