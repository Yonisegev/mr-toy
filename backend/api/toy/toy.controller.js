const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service');

// List

async function getToys(req, res) {
    try {
        const filterBy = req.query;
        console.log('querying');
        const toys = await toyService.query(filterBy);
        res.json(toys);
    } catch (err) {
        logger.error('Failed to get toys', err);
        res.status(500).send({ err: 'Failer ti get toys' });
    }
}

// Read

async function getToyById(req, res) {
    try {
        const toyId = req.params.id;
        const toy = await toyService.getById(toyId);
        res.json(toy);
    } catch (err) {
        logger.error('Failer to get toy', err);
        res.status(500).send({ err: 'Failed to get toy' });
    }
}

// Create

async function addToy(req, res) {
    try {
        const { toy } = req.body;
        const addedToy = await toyService.add(toy);
        res.json(addedToy);
    } catch (err) {
        logger.error('Failed to add toy', err);
        res.status(500).send({ err: 'Failed to add toy' });
    }
}

// Update

async function updateToy(req, res) {
    try {
        const { toy } = req.body;
        const savedToy = await toyService.update(toy);
        console.log('toy to save', savedToy);
        res.json(savedToy);
    } catch (err) {
        logger.error('Failed to update toy', err);
        res.status(500).send({ err: 'Failed to update toy' });
    }
}

// Delete

async function removeToy(req, res) {
    try {
        const toyId = req.params.id;
        const removedId = toyService.remove(toyId);
        res.send(removedId);
    } catch (err) {
        logger.error('Failed to delete toy', err);
        res.status(500).send({ err: 'Failed to delete toy' });
    }
}
module.exports = {
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy
};