const db = require('../db');

exports.getAllSessions = async (req, res) => {
  try {
    const [sessions] = await db.query(`
      SELECT s.*, 
        t.title as therapist_title, 
        t.name as therapist_name,
        c.name as client_name
      FROM Sessions s
      LEFT JOIN Therapists t ON s.therapistId = t.id
      LEFT JOIN Clients c ON s.clientId = c.id
    `);
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ 
      message: 'Failed to fetch sessions',
      error: err.message 
    });
  }
};

exports.createSession = async (req, res) => {
  const { therapistId, clientId, notes, date, length } = req.body;

  // Validate input
  if (!therapistId || !clientId || !date) {
    return res.status(400).json({ 
      message: 'Therapist ID, client ID, and date are required' 
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Sessions (therapistId, clientId, notes, date, length) VALUES (?, ?, ?, ?, ?)',
      [therapistId, clientId, notes, date, length || 60]
    );

    const [newSession] = await db.query(`
      SELECT s.*, 
        t.title as therapist_title, 
        t.name as therapist_name,
        c.name as client_name
      FROM Sessions s
      LEFT JOIN Therapists t ON s.therapistId = t.id
      LEFT JOIN Clients c ON s.clientId = c.id
      WHERE s.id = ?
    `, [result.insertId]);
    
    res.status(201).json(newSession[0]);
  } catch (err) {
    console.error('Error creating session:', err);
    
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ 
        message: 'Invalid therapist or client ID' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to create session',
      error: err.message 
    });
  }
};

exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const { therapistId, clientId, notes, date, length } = req.body;

  try {
    await db.query(
      'UPDATE Sessions SET therapistId=?, clientId=?, notes=?, date=?, length=? WHERE id=?',
      [therapistId, clientId, notes, date, length, id]
    );

    const [updatedSession] = await db.query(`
      SELECT s.*, 
        t.title as therapist_title, 
        t.name as therapist_name,
        c.name as client_name
      FROM Sessions s
      LEFT JOIN Therapists t ON s.therapistId = t.id
      LEFT JOIN Clients c ON s.clientId = c.id
      WHERE s.id = ?
    `, [id]);
      
    if (!updatedSession.length) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.json(updatedSession[0]);
  } catch (err) {
    console.error('Error updating session:', err);
    res.status(500).json({ 
      message: 'Failed to update session',
      error: err.message 
    });
  }
};

exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query(
      'DELETE FROM Sessions WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    console.error('Error deleting session:', err);
    res.status(500).json({ 
      message: 'Failed to delete session',
      error: err.message 
    });
  }
};