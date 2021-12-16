const fs = require('fs');

const gToys = require('../data/toy.json')

function query(filterBy) {
    var toys = gToys;
    if (filterBy.word) {
        const regex = new RegExp(filterBy.word, 'i');
        toys = toys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.type) {
        toys = toys.filter(toy => {
            if (filterBy.type === 'instock') return toy.inStock
            if (filterBy.type === 'soldout') return !toy.inStock
        })
    }
    if (filterBy.labels) {
        toys = toys.filter(toy => {
            return filterBy.labels.every(label => toy.labels.includes(label))
        })
    }
    return Promise.resolve(toys)
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    toy.reviews = _createReviews()
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    if (idx === -1) {
        return Promise.reject('Cannot remove toy')
    }
    gToys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const idx = gToys.findIndex(currToy => currToy._id === toy._id)
        gToys[idx] = toy
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        toy.inStock = true
        gToys.unshift(toy)
    }
    return _saveToysToFile()
        .then(() => toy)
}

module.exports = {
    query,
    getById,
    remove,
    save
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}

function _createReviews() {
    return [
        { name: 'Muki Ben Puki', rate: 4, readAt: '10/09/2020', txt: 'Wow, thats a great game! im gonna play it so much!!' },
        { name: 'Shuki Laka Boom', rate: 1, readAt: '25/07/2020', txt: 'Worst game EVAHHHHHHH, cant stand it!' },
        { name: 'Nana Banani', rate: 5, readAt: '13/01/2021', txt: 'Played it with my entire family and loved every minute!!! wow!!!!!!!!!!!!!!!!!!' },
    ]
}