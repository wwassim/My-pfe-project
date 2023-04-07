import axios from 'axios'

const API_URL = '/auth/register'
const API_URL_LOGIN = '/auth/login'

const register = async (userData)=>{
    const response = await axios.post(API_URL, userData)
   
    if (response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    localStorage.setItem('token', JSON.stringify(response.data.accessToken));

    // Refresh the data in local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    localStorage.setItem('user', JSON.stringify({...user, accessToken: token}));
  }

  return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user')
  }




const authService = {login, register ,logout}

export default authService