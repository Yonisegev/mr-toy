import { httpService } from './httpService.js';


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
  toyValidator,
  getEmptyToy
};

const BASE_URL = 'toy';

async function query(filterBy = {}) {
  try {
    const filter = { ...filterBy };
    console.log('FILTER', filterBy);
    if (filter.labels) {
      filter.labels = filter.labels.map((label) => label.label);
    }
    return httpService.get(BASE_URL, filter);
  } catch (err) {
    console.log('can not read toys from server', err);
    throw err;
  }
}

async function getToyById(toyId) {
  try {
    return httpService.get(`${BASE_URL}/${toyId}`);
  } catch (err) {
    console.log('can not read toy from server', err);
    throw err;
  }
}

async function removeToy(toyId) {
  try {
    return httpService.delete(`${BASE_URL}/${toyId}`);
  } catch (err) {
    console.log('can not delete toy from server', err);
    throw err;
  }
}

async function addToy(toy) {
  try {
    return httpService.post(BASE_URL, { toy });
  } catch (err) {
    console.log('can not add toy from server', err);
    throw err;
  }
}

async function updateToy(toy) {
  try {
    return httpService.put(BASE_URL, { toy });
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

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: [],
  };
}
