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

  export const postAuth = async (data, url)=> {
    const BASEURL = process.env.LOCAL_BASEURL;
    return await fetch(`http://10.0.2.2:6767/${url}/adminlogin`, {
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