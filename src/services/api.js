import axios from 'axios';

export const handleResponse = response => {
    console.log(response);
    const data = response.data;

    if(response.status >= 200 && response.status <= 300){
        return data;
    }
    else{
        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
    }
}
export const authHeaders = () => {
    const loginData = JSON.parse(localStorage.getItem("userToken")) || {}
    const isExpired = loginData ? new Date((loginData.created_at + loginData.expires_in) * 1000) < new Date() : true
    if(isExpired) {
      user_authActions.logout()
    }
    const { access_token: accessToken } = loginData
    return !!accessToken
      ? {
          Authorization: "Bearer " + accessToken,
        }
      : {}
  }
export const api =  axios.create({ baseURL : process.env.BASEURL });