import Axios from 'axios';
import { userService } from './userService.js';
const axios = Axios.create({
  withCredentials: true,
});

const gLabels = [
  'On wheels',
  'Car',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Board game',
  'Multi participants',
  'Sports',
  'Battery Powered',
].sort();

export const toyService = {
  query,
  removeToy,
  addToy,
  updateToy,
  getToyById,
  getLabels,
  addReview,
  toyValidator,
};

const BASE_URL = 'http://127.0.0.1:3030/api/toy'

async function query(filterBy = {}) {
  try {
    const filter = { ...filterBy };
    if (filter.labels)
      filter.labels = filter.labels.map((label) => label.label);
    const { data } = await axios.get(BASE_URL, {
      params: filter,
    });
    return data;
  } catch (err) {
    console.log('can not read toys from server', err);
    throw err;
  }
}

async function getToyById(toyId) {
  try {
    const res = await axios.get(`${BASE_URL}/${toyId}`);
    return res.data;
  } catch (err) {
    console.log('can not read toy from server', err);
    throw err;
  }
}

async function removeToy(toyId) {
  const user = userService.getLoggedinUser();
  try {
    const res = await axios.delete(`${BASE_URL}/${toyId}`, {
      data: { user },
    });
    return res;
  } catch (err) {
    console.log('can not delete toy from server', err);
    throw err;
  }
}

async function addToy(toy) {
  const user = userService.getLoggedinUser();
  try {
    const res = await axios.post(BASE_URL, {
      toy,
      user,
    });
    return res.data;
  } catch (err) {
    console.log('can not add toy from server', err);
    throw err;
  }
}

async function updateToy(toy) {
  const user = userService.getLoggedinUser();
  try {
    const res = await axios.put(BASE_URL, {
      toy,
      user
    });
    return res.data;
  } catch (err) {
    console.log('can not update toy from server', err);
    throw err;
  }
}

 function getLabels() {
  return gLabels;
}

function toyValidator(toy) {
  const missingFields = Object.keys(toy).filter((field) => !toy[field]);
  let message = '';
  if (missingFields.length) {
    message = `Missing fields - ${missingFields.join(',')}`;
  }
  return {
    valid: !Boolean(message),
    message,
  };
}

function addReview(toy, review) {
  console.log('toy', toy)
  toy.reviews.unshift(review);
  return toy;
}
