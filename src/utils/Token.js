import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

const isExpired = (tokenData)=> {
    if(tokenData){

    }
    const token = jwtDecode(tokenData);
    console.log(token);
    const current_time = new Date().getTime() / 1000;
	if (current_time > token.exp) { 
        return true;
     }
     return false;
}
const readAsyncStorageByKey = async (key) => {
    const data = await AsyncStorage.getItem(key);
    const parseData = JSON.parse(data);
    return !!parseData ? parseData : {}
}
export const Token = {
    isExpired,
    readAsyncStorageByKey
}   