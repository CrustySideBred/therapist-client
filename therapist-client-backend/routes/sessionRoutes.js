const express = require('express');
const router = express.Router();
const {
  getAllSessions,
  createSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');


router.get('/', getAllSessions);


router.post('/', createSession);


router.put('/:id', updateSession);


router.delete('/:id', deleteSession);

module.exports = router;