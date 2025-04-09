const express = require('express');
const router = express.Router();
const {
  getAllTherapists,  
  createTherapist,   
  updateTherapist,   
  deleteTherapist    
} = require('../controllers/therapistController');

router.get('/', getAllTherapists); 

router.post('/', createTherapist); 

router.put('/:id', updateTherapist); 

router.delete('/:id', deleteTherapist); 

module.exports = router;