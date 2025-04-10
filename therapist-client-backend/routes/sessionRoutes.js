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


router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);


router.get('/therapists/dropdown', getTherapistsForDropdown);
router.get('/clients/dropdown', getClientsForDropdown);

module.exports = router;