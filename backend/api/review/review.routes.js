const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { add, query, get, remove, update } = require('./review.controller')
const router = express.Router()

router.get('/', query)
// router.get('/:id', get)
// router.put('/:id', update)
router.post('/', add)
router.delete('/:id', remove)

module.exports = router
