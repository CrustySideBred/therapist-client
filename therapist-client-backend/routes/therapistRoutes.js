const express = require('express');
const router = express.Router();
const {
  getAllTherapists,  // Used in fetchTherapists()
  createTherapist,   // Used in createTherapist()
  updateTherapist,   // Used in updateTherapist()
  deleteTherapist    // Used in deleteTherapist()
} = require('../controllers/therapistController');

// GET all therapists (for fetchTherapists())
router.get('/', getAllTherapists); 

// POST new therapist (for createTherapist())
router.post('/', createTherapist); 

// UPDATE therapist (for updateTherapist())
router.put('/:id', updateTherapist); 

// DELETE therapist (for deleteTherapist())
router.delete('/:id', deleteTherapist); 

module.exports = router;