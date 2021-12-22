const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware');
const express = require('express');
const { log } = require('../../middlewares/logger.middleware');
const {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
} = require('./toy.controller');
const router = express.Router();

router.get('/', log, getToys);
router.get('/:id', getToyById);
router.post('/', requireAuth, addToy);
router.put('/', /* requireAuth, requireAdmin, */ updateToy);
router.delete('/:id', requireAuth, requireAdmin, removeToy);

module.exports = router;
