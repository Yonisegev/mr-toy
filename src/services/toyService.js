import Axios from 'axios';
// import { userService } from './user.service.js';
const axios = Axios.create({
  withCredentials: true,
});

const glabels = [
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
];

export const toyService = {
  query,
  // removeToy,
  // addToy,
  // updateToy,
  getToyById,
  getlabels,
  addReview,
};

async function query(filterBy = {}) {
  try {
    const filter = { ...filterBy };
    if (filter.labels)
      filter.labels = filter.labels.map((label) => label.label);
    const { data } = await axios.get('http://127.0.0.1:3030/api/toy', {
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
    const res = await axios.get(`http://127.0.0.1:3030/api/toy/${toyId}`);
    return res.data;
  } catch (err) {
    console.log('can not read toy from server', err);
    throw err;
  }
}

// async function removeToy(toyId) {
//   const user = userService.getLoggedinUser();
//   try {
//     const res = await axios.delete(`http://127.0.0.1:3030/api/toy/${toyId}`, {
//       data: { user },
//     });
//     return res;
//   } catch (err) {
//     console.log('can not delete toy from server', err);
//     throw err;
//   }
// }

// async function addToy(toy) {
//   const user = userService.getLoggedinUser();
//   try {
//     const res = await axios.post('http://127.0.0.1:3030/api/toy', {
//       toy,
//       user,
//     });
//     return res.data;
//   } catch (err) {
//     console.log('can not add toy from server', err);
//     throw err;
//   }
// }

// async function updateToy(toy, isReview = false) {
//   const user = userService.getLoggedinUser();
//   try {
//     const res = await axios.put('http://127.0.0.1:3030/api/toy', {
//       toy,
//       user,
//       isReview,
//     });
//     return res.data;
//   } catch (err) {
//     console.log('can not update toy from server', err);
//     throw err;
//   }
// }

function getlabels() {
  return glabels.sort();
}

function addReview(toy, review) {
  toy.reviews.unshift(review);
  return toy;
}
