const db = require('../db');


const getAllTherapists = async (req, res) => {
  try {
    const [therapists] = await db.query('SELECT * FROM Therapists');
    res.json(therapists);
  } catch (err) {
    console.error('Error fetching therapists:', err);
    res.status(500).json({ error: 'Error fetching therapists' });
  }
};


const getTherapistById = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM Therapists WHERE id = ?', [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Therapist not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching therapist:', err);
    res.status(500).json({ error: 'Error fetching therapist' });
  }
};

const createTherapist = async (req, res) => {
  const { title, name, email, location, yearsOfPractice, availability } = req.body;
  
  if (!title || !name || !email || !location || !yearsOfPractice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Therapists (title, name, email, location, yearsOfPractice, availability) VALUES (?, ?, ?, ?, ?, ?)',
      [title, name, email, location, yearsOfPractice, availability || 'TAKING CLIENTS']
    );
    
    const [newTherapist] = await db.query('SELECT * FROM Therapists WHERE id = ?', [result.insertId]);
    res.status(201).json(newTherapist[0]);
  } catch (err) {
    console.error('Error creating therapist:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Error creating therapist' });
  }
};


const updateTherapist = async (req, res) => {
  const { title, name, email, location, yearsOfPractice, availability } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE Therapists SET title = ?, name = ?, email = ?, location = ?, yearsOfPractice = ?, availability = ? WHERE id = ?',
      [title, name, email, location, yearsOfPractice, availability, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Therapist not found' });
    }
    
    const [updatedTherapist] = await db.query('SELECT * FROM Therapists WHERE id = ?', [req.params.id]);
    res.json(updatedTherapist[0]);
  } catch (err) {
    console.error('Error updating therapist:', err);
    res.status(500).json({ error: 'Error updating therapist' });
  }
};


const deleteTherapist = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Therapists WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Therapist not found' });
    }
    
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting therapist:', err);
    res.status(500).json({ error: 'Error deleting therapist' });
  }
};

module.exports = {
  getAllTherapists,
  getTherapistById,
  createTherapist,
  updateTherapist,
  deleteTherapist
};