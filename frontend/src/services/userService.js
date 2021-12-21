import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true
});
const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}

async function login(credentials) {
    try {
        const res = await axios.post('http://localhost:3030/api/auth/login', credentials)
        const user = res.data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        throw err
    }
}
async function logout() {
    try {
        await axios.post('http://localhost:3030/api/auth/logout')
        sessionStorage.removeItem(STORAGE_KEY)
    } catch (err) {
        throw err
    }
}

async function signup(credentials) {
    try {
        const res = await axios.post('http://localhost:3030/api/auth/signup', credentials);
        const user = res.data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}