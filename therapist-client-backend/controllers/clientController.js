const { Client } = require('../models/Client');
const db = require('../db');

const getAllClients = async (req, res) => {
  try {
    const [clients] = await db.query('SELECT * FROM Clients');
    res.json(clients);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Error fetching clients' });
  }
};

const getClientById = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM Clients WHERE id = ?', [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching client:', err);
    res.status(500).json({ error: 'Error fetching client' });
  }
};


const createClient = async (req, res) => {
  const { name, email, phone, regularity } = req.body;
  

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Clients (name, email, phone, regularity) VALUES (?, ?, ?, ?)',
      [name, email, phone, regularity || 'WEEKLY']
    );

    const [newClient] = await db.query('SELECT * FROM Clients WHERE id = ?', [result.insertId]);
    res.status(201).json(newClient[0]);
  } catch (err) {
    console.error('Error creating client:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Error creating client' });
  }
};


const updateClient = async (req, res) => {
  const { name, email, phone, regularity } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE Clients SET name = ?, email = ?, phone = ?, regularity = ? WHERE id = ?',
      [name, email, phone, regularity, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
 
    const [updatedClient] = await db.query('SELECT * FROM Clients WHERE id = ?', [req.params.id]);
    res.json(updatedClient[0]);
  } catch (err) {
    console.error('Error updating client:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Error updating client' });
  }
};


const deleteClient = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Clients WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).json({ error: 'Error deleting client' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};