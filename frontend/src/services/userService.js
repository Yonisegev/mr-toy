import { httpService } from './httpService';

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
};

const STORAGE_KEY = 'loggedinUser';
const BASE_URL = 'auth';
async function login(credentials) {
    try {
        const user = await httpService.post(`${BASE_URL}/login`, credentials);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        throw err;
    }
}
async function logout() {
    try {
        await httpService.post(`${BASE_URL}/logout`);
        sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        throw err;
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post(`${BASE_URL}/signup`, credentials);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        return user;
    } catch (err) {
        throw err;
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}