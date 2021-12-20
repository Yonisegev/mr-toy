import Axios from 'axios';

const axios = Axios.create({
    withCredentials: true
})

export const reviewService = {
    add,
    query,
    remove
}

const BASE_URL = 'http://127.0.0.1:3030/api/review';

async function query(toyId) {
    const res = await axios.get(`${BASE_URL}?toyId=${toyId}`)
    return res.data
}

async function remove(reviewId) {
    const res = axios.delete(`${BASE_URL}/${reviewId}`)
    return res.data
}
async function add(review) {
    const res = await axios.post(`${BASE_URL}`, review);
    return res.data;
}
