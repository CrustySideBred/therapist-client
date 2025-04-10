const db = require('../db');

// Get all sessions with therapist and client details
const getAllSessions = async (req, res) => {
  try {
    const [sessions] = await db.query(`
      SELECT 
        s.id, s.notes, s.date, s.length,
        s.createdAt, s.updatedAt,
        t.id as therapistId, t.title as therapistTitle, t.name as therapistName,
        c.id as clientId, c.name as clientName
      FROM Sessions s
      JOIN Therapists t ON s.therapistId = t.id
      JOIN Clients c ON s.clientId = c.id
      ORDER BY s.date DESC
    `);
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ error: 'Error fetching sessions' });
  }
};

// Get single session by ID
const getSessionById = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        s.id, s.notes, s.date, s.length,
        s.createdAt, s.updatedAt,
        t.id as therapistId, t.title as therapistTitle, t.name as therapistName,
        c.id as clientId, c.name as clientName
      FROM Sessions s
      JOIN Therapists t ON s.therapistId = t.id
      JOIN Clients c ON s.clientId = c.id
      WHERE s.id = ?
    `, [req.params.id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching session:', err);
    res.status(500).json({ error: 'Error fetching session' });
  }
};

// Create new session
const createSession = async (req, res) => {
  const { therapistId, clientId, notes, date, length } = req.body;
  
  // Validate required fields
  if (!therapistId || !clientId || !date) {
    return res.status(400).json({ error: 'Therapist ID, client ID, and date are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Sessions (therapistId, clientId, notes, date, length) VALUES (?, ?, ?, ?, ?)',
      [therapistId, clientId, notes, date, length || 60]
    );
    
    // Return the newly created session with joined data
    const [newSession] = await db.query(`
      SELECT 
        s.id, s.notes, s.date, s.length,
        s.createdAt, s.updatedAt,
        t.id as therapistId, t.title as therapistTitle, t.name as therapistName,
        c.id as clientId, c.name as clientName
      FROM Sessions s
      JOIN Therapists t ON s.therapistId = t.id
      JOIN Clients c ON s.clientId = c.id
      WHERE s.id = ?
    `, [result.insertId]);
    
    res.status(201).json(newSession[0]);
  } catch (err) {
    console.error('Error creating session:', err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid therapist or client ID' });
    }
    res.status(500).json({ error: 'Error creating session' });
  }
};

// Update session
const updateSession = async (req, res) => {
  const { therapistId, clientId, notes, date, length } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE Sessions SET therapistId = ?, clientId = ?, notes = ?, date = ?, length = ? WHERE id = ?',
      [therapistId, clientId, notes, date, length, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    // Return the updated session with joined data
    const [updatedSession] = await db.query(`
      SELECT 
        s.id, s.notes, s.date, s.length,
        s.createdAt, s.updatedAt,
        t.id as therapistId, t.title as therapistTitle, t.name as therapistName,
        c.id as clientId, c.name as clientName
      FROM Sessions s
      JOIN Therapists t ON s.therapistId = t.id
      JOIN Clients c ON s.clientId = c.id
      WHERE s.id = ?
    `, [req.params.id]);
    
    res.json(updatedSession[0]);
  } catch (err) {
    console.error('Error updating session:', err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid therapist or client ID' });
    }
    res.status(500).json({ error: 'Error updating session' });
  }
};

// Delete session
const deleteSession = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Sessions WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting session:', err);
    res.status(500).json({ error: 'Error deleting session' });
  }
};

// Get therapists for dropdown
const getTherapistsForDropdown = async (req, res) => {
  try {
    const [therapists] = await db.query(
      'SELECT id, title, name FROM Therapists ORDER BY name'
    );
    res.json(therapists);
  } catch (err) {
    console.error('Error fetching therapists:', err);
    res.status(500).json({ error: 'Error fetching therapists' });
  }
};

// Get clients for dropdown
const getClientsForDropdown = async (req, res) => {
  try {
    const [clients] = await db.query(
      'SELECT id, name FROM Clients ORDER BY name'
    );
    res.json(clients);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Error fetching clients' });
  }
};


module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getTherapistsForDropdown,
  getClientsForDropdown
};