const Session = require('../models/Session');

// Get ALL sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('therapistId', 'name title') // Include therapist details
      .populate('clientId', 'name'); // Include client details
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create session
exports.createSession = async (req, res) => {
  const { therapistId, clientId, notes, date, length } = req.body;
  
  try {
    const newSession = new Session({
      therapistId,
      clientId,
      notes,
      date,
      length
    });
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update session
exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const { therapistId, clientId, notes, date, length } = req.body;

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { therapistId, clientId, notes, date, length },
      { new: true }
    );
    res.json(updatedSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete session
exports.deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    await Session.findByIdAndDelete(id);
    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};