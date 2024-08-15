import axios from "axios"
import Cookies from "universal-cookie"
const cookie = new Cookies
const baseUrl = 'https://backendbic.onrender.com'
export const LoginApi = async (data) => {
    const res = await axios.post(`${baseUrl}/login`,data)
    return res
}

export const LeadRegister = async (data) => {
    const res = await axios.post(`${baseUrl}/register`,data)
    return res
}

export const logoutApi = async () => {
    let token = cookie.get('bictoken')
    const res = await axios.get(`${baseUrl}/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}
export const escalationApi = async (data) => {
    let token = cookie.get('bictoken')
    const res = await axios.post(`${baseUrl}/createEscalation`,data,{
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    })
    return res
}

export const evaluationApi = async (data) => {
    let token = cookie.get('bictoken')
    const res = await axios.post(`${baseUrl}/createEvaluation`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const ppcApi = async (data) => {
    let token = cookie.get('bictoken')
    const res = await axios.post(`${baseUrl}/createppc`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const fetchleaders = async () => {
    let token = cookie.get('bictoken')
    const res = await axios.get(`${baseUrl}/fetchleaders`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const fetchallusers = async () => {
    let token = cookie.get('bictoken')
    const res = await axios.get(`${baseUrl}/getallusers`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const fetchuserbyid = async (id) => {
    let token = cookie.get('bictoken')
    const res = await axios.get(`${baseUrl}/fetchuserbyid/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const retrieveReport = async (name) => {
    let token = cookie.get('bictoken')
    const res = await axios.get(`${baseUrl}/getuserdata/${name}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const createteamLeaders = async (data) => {
    let token = cookie.get('bictoken')
    const res = await axios.post(`${baseUrl}/createteamLeaders`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const leaddelete = async (id) => {
    let token = cookie.get('bictoken')
    const res = await axios.delete(`${baseUrl}/leaddelete/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const getNotification = async () => {
    let token = cookie.get('bictoken')
    const res = await axios.get(`${baseUrl}/notification`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res
}