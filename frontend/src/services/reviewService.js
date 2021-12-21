import { httpService } from './httpService';

export const reviewService = {
    add,
    query,
    getEmptyReview
};

const BASE_URL = 'review';

async function query(filterBy) {
    return httpService.get(BASE_URL, filterBy);
}

async function add(review) {
    return httpService.post(BASE_URL, review);
}

function getEmptyReview() {
    return {
        userId: '',
        username: '',
        txt: '',
        rate: 1,
        toyId: '',
        toyName: '',
        addedAt: new Date().toISOString().split('T')[0],
    };
}
