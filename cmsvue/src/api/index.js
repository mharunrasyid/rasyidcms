import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const login = async (email, password) => {
    return await request.post("users/login", { email, password })
}

export const register = async (email, password, retypepassword) => {
    return await request.post("users/register", { email, password, retypepassword })
}

export const logoutUser = async (token) => {
    return await request.get("users/destroy", { headers: { "Authorization": `Bearer ${token}` } })
}

export const userToken = async (token) => {
    return await request.get("users/token", { headers: { "Authorization": `Bearer ${token}` } })
}

export const readData = async (token) => {
    return await request.get("data", { headers: { "Authorization": `Bearer ${token}` } })
}

export const createData = async (token, letter, frequency) => {
    return await request.post("data", { letter, frequency }, { headers: { "Authorization": `Bearer ${token}` } })
}

export const searchData = async (token, letter, frequency) => {
    let data;
    if (!letter && !frequency) {
        data = {}
    } else if (!letter) {
        data = { frequency }
    } else if (!frequency) {
        data = { letter }
    } else {
        data = { letter, frequency }
    }
    return await request.post("data/search", data, { headers: { "Authorization": `Bearer ${token}` } })
}
 
export const editData = async (token, idData, letter, frequency) => {
    await request.put(`data/${idData}`, { letter, frequency }, { headers: { "Authorization": `Bearer ${token}` } })
    return await request.get("data", { headers: { "Authorization": `Bearer ${token}` } })
}

export const deleteData = async (token, idData) => {
    await request.delete(`data/${idData}`, { headers: { "Authorization": `Bearer ${token}` } })
    return await request.get("data", { headers: { "Authorization": `Bearer ${token}` } })
} 

export const readDataDate = async (token) => {
    return await request.get("datadate", { headers: { "Authorization": `Bearer ${token}` } })
}

export const createDataDate = async (token, letter, frequency) => {
    return await request.post("datadate", { letter, frequency }, { headers: { "Authorization": `Bearer ${token}` } })
}

export const searchDataDate = async (token, letter, frequency) => {
    let data;
    if (!letter && !frequency) {
        data = {}
    } else if (!letter) {
        data = { frequency }
    } else if (!frequency) {
        data = { letter }
    } else {
        data = { letter, frequency }
    }
    return await request.post("datadate/search", data, { headers: { "Authorization": `Bearer ${token}` } })
}
 
export const editDataDate = async (token, idData, letter, frequency) => {
    await request.put(`datadate/${idData}`, { letter, frequency }, { headers: { "Authorization": `Bearer ${token}` } })
    return await request.get("datadate", { headers: { "Authorization": `Bearer ${token}` } })
}

export const deleteDataDate = async (token, idData) => {
    await request.delete(`datadate/${idData}`, { headers: { "Authorization": `Bearer ${token}` } })
    return await request.get("datadate", { headers: { "Authorization": `Bearer ${token}` } })
} 
