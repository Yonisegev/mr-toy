const reviewService = require('./review.service')

async function query(req, res) {
    const filterBy = req.query;
    try {
        const reviews = await reviewService.query(filterBy)
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ err })
    }
}
async function get(req, res) {
    try {
        const review = await reviewService.get(req.params.id)
        res.json(review);
    } catch (err) {
        res.status(500).json({ err })
    }
}
async function add(req, res) {
    const review = req.body;
    try {
        const newReview = await reviewService.add(review)
        res.json(newReview);
    } catch (err) {
        res.status(500).json({ err })
    }
}
async function remove(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.json({ message: 'your review was deleted!' });
    } catch (err) {
        res.status(500).json({ err })
    }
}
async function update(req, res) {
    const review = req.body;
    try {
        const updatedReview = await reviewService.update(review)
        res.json(updatedReview);
    } catch (err) {
        res.status(500).json({ err })
    }
}
module.exports = {
    add,
    query,
    get,
    remove,
    update
}