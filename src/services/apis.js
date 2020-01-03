import { AsyncStorage } from "react-native";
import { Token } from "../utils/Token";
import { userAuth } from "./user_auth";
import { Appnavigation } from "../utils/AppNavigation";

// export const handleResponse = response => {
//     const data = response.data;

//     if(response.status >= 200 && response.status <= 300){
//         return data;
//     }
//     else{
//         const error = (data && data.message) || response.statusText;

//         return Promise.reject(error);
//     }
// }
export const authHeaders = async () => {
    const parseUser = await Token.readAsyncStorageByKey('userDetail');
    const { token: accessToken } = parseUser;
    return !!accessToken
      ? {
         Accept: 'application/json',
         'Content-Type': 'application/json',
          Authorization: "Bearer " + accessToken,
        }
      : {}
  }

  export const postAuth = async (data, url)=> {
    const BASEURL = process.env.BASEURL;
    console.log('BASEURL : ',BASEURL);
    return await fetch(`http://10.0.2.2:6767/${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            return response.json();
        })
        .then((resJson) => {
            console.log(resJson);
            return resJson;
        })
        .catch((error) => {
            console.error(error);
            return error;
          });
}

export const post = async (data, url)=> {
  const auth = await authHeaders();
  return await fetch(`http://10.0.2.2:6767/${url}`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify(data),
      })
      .then((response) => {
        if(response.status){
            userAuth.logout(Appnavigation.getNavigation());
        }
          return response.json();
      })
      .then((resJson) => {
          return resJson;
      })
      .catch((error) => {
        console.error(error);
        return error;
        });
}

export const get = async (url)=> {
  const auth = await authHeaders();
  return await fetch(`http://10.0.2.2:6767/${url}`, {
      method: 'GET',
      headers: auth,
      body: null
      })
      .then((response) => {
        if(response.status){
            userAuth.logout(Appnavigation.getNavigation());
        }
          return response.json();
      })
      .then((resJson) => {
          return resJson;
      })
      .catch((error) => {
          console.error(error);
         // return error;
        });
}


export const del = async (url)=> {
    const auth = await authHeaders();
    return await fetch(`http://10.0.2.2:6767/${url}`, {
        method: 'DELETE',
        headers: auth,
        //body: JSON.stringify(data),
        })
        .then((response) => {
            if(response.status){
                userAuth.logout(Appnavigation.getNavigation());
            }
            return response.json();
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.error(error);
          return error;
          });
  }