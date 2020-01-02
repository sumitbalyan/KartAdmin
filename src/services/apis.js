import { AsyncStorage } from "react-native";

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
    const userDetail = await AsyncStorage.getItem("userDetail");
    const parseUser = JSON.parse(userDetail) || {};
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
    const BASEURL = process.env.LOCAL_BASEURL;
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
            return resJson;
        })
        .catch((error) => {
            console.error(error);
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
          return response.json();
      })
      .then((resJson) => {
          return resJson;
      })
      .catch((error) => {
          console.error(error);
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
          return response.json();
      })
      .then((resJson) => {
          return resJson;
      })
      .catch((error) => {
          console.error(error);
        });
}
