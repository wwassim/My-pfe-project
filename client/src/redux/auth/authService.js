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
    const response = await axios.post(API_URL_LOGIN, userData)
    if (response.data) {    
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', JSON.stringify(response.data.accessToken))

    }

    return response.data
  }

// Logout user
const logout = () => {
    localStorage.removeItem('user')
  }




const authService = {login, register ,logout}

export default authService