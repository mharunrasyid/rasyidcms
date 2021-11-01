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
    await request.post("data", { letter, frequency }, { headers: { "Authorization": `Bearer ${token}` } })
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
