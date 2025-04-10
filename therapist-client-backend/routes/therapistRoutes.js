const express = require('express');
const router = express.Router();
const {
  getAllTherapists,
  getTherapistById,
  createTherapist,
  updateTherapist,
  deleteTherapist
} = require('../controllers/therapistController');

router.get('/', getAllTherapists);
router.get('/:id', getTherapistById);
router.post('/', createTherapist);
router.put('/:id', updateTherapist);
router.delete('/:id', deleteTherapist);

module.exports = router;