const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

// Define routes
router.get('/', getAllClients); // GET /api/clients
router.get('/:id', getClientById); // GET /api/clients/:id
router.post('/', createClient); // POST /api/clients
router.put('/:id', updateClient); // PUT /api/clients/:id
router.delete('/:id', deleteClient); // DELETE /api/clients/:id

module.exports = router;