import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// const PATH = 'todos'

// export const read = async () => {
//     const { data } = await request.get(PATH)
//     return data
// }

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
