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
  saveToy,
  getToyById,
  getLabels,
  toyValidator,
  getEmptyToy,
  getEmptyFilterBy,
};

const BASE_URL = 'toy';

async function query(filterBy = {}) {
  try {
    // const filter = { ...filterBy };
    // if (filter.labels) {
    //   filter.labels = filter.labels.map((label) => label.label);
    // }
    return httpService.get(BASE_URL, filterBy);
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

async function saveToy(toy) {
  try {
    if (toy._id) {
      return httpService.put(BASE_URL, { toy });
    } else {
      return httpService.post(BASE_URL, { toy });
    }
  } catch (err) {
    console.log(`could not save toy `, err);
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

//returns async value, since in real apps this data would probably live in the backend.
function getLabels() {
  return Promise.resolve(gLabels);
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
function getEmptyFilterBy() {
  return {
    word: '',
    type: '',
    labels: [],
  };
}
