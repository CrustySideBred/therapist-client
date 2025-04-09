const express = require('express');
const router = express.Router();
const {
  getAllSessions,
  createSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');

// GET all sessions (with populated therapist and client)
router.get('/', getAllSessions);

// POST new session
router.post('/', createSession);

// UPDATE session
router.put('/:id', updateSession);

// DELETE session
router.delete('/:id', deleteSession);

module.exports = router;