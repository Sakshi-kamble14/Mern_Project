import axios from 'axios'
import config from './config'

export async function loginUser(email,password){
    const URL = config.BASE_URL+'/user/login'
    const body = {email,password}

   const response = await axios.post(URL,body)

   return response.data
}

export async function registerUser(name, email, password, mobile) {
    const URL = config.BASE_URL + '/user/register'
    const body = { name, email, password, mobile }
    const response = await axios.post(URL, body)
    return response.data
}


export async function getUserProfile(token){
    const URL = config.BASE_URL
    
}