const express = require('express');
const router = express.Router();
const {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getTherapistsForDropdown,
  getClientsForDropdown
} = require('../controllers/sessionController');

// Session CRUD routes
router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

// New routes for dropdown data
router.get('/therapists/dropdown', getTherapistsForDropdown);
router.get('/clients/dropdown', getClientsForDropdown);

module.exports = router;