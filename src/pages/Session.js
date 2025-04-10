import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Session.css';

const Session = () => {
  const [therapistId, setTherapistId] = useState('');
  const [clientId, setClientId] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [length, setLength] = useState(60);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [sessionsRes, therapistsRes, clientsRes] = await Promise.all([
        axios.get('http://localhost:3001/api/sessions'),
        axios.get('http://localhost:3001/api/therapists'),
        axios.get('http://localhost:3001/api/clients')
      ]);
      setSessions(sessionsRes.data);
      setTherapists(therapistsRes.data);
      setClients(clientsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!therapistId || !clientId || !date) {
      setError('Please select a therapist, client, and date');
      return;
    }

    // Format date for backend (YYYY-MM-DD)
    const formattedDate = new Date(date).toISOString().split('T')[0];

    const sessionData = {
      therapistId: parseInt(therapistId),
      clientId: parseInt(clientId),
      notes,
      date: formattedDate,
      length: parseInt(length)
    };

    try {
      if (editingSession) {
        await axios.put(`http://localhost:3001/api/sessions/${editingSession.id}`, sessionData);
      } else {
        await axios.post('http://localhost:3001/api/sessions', sessionData);
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving session:', error);
      setError(error.response?.data?.error || 'Failed to save session. Please try again.');
    }
  };

  const startEditing = (session) => {
    setEditingSession(session);
    setTherapistId(session.therapistId.toString());
    setClientId(session.clientId.toString());
    setNotes(session.notes || '');
    // Convert backend date to local date format for input
    setDate(session.date.split('T')[0]);
    setLength(session.length.toString());
  };

  const resetForm = () => {
    setTherapistId('');
    setClientId('');
    setNotes('');
    setDate('');
    setLength('60');
    setEditingSession(null);
    setError('');
  };

  const deleteSession = async (id) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;
    
    try {
      await axios.delete(`http://localhost:3001/api/sessions/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting session:', error);
      setError('Failed to delete session. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTherapistName = (id) => {
    const therapist = therapists.find(t => t.id === id);
    return therapist ? `${therapist.title} ${therapist.name}` : 'Unknown Therapist';
  };

  const getClientName = (id) => {
    const client = clients.find(c => c.id === id);
    return client ? client.name : 'Unknown Client';
  };

  return (
    <div className="session-container">
      <h1 className="session-header">Session Management</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="session-editing">
        <select
          value={therapistId}
          onChange={(e) => setTherapistId(e.target.value)}
          className="session-input"
          required
        >
          <option value="">Select Therapist</option>
          {therapists.map(therapist => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.title} {therapist.name}
            </option>
          ))}
        </select>

        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="session-input"
          required
        >
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="session-input"
          required
        />

        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="session-input"
        >
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
        </select>

        <textarea
          placeholder="Session Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="session-input notes-input"
          rows="3"
        />

        <div className="session-form-buttons">
          <button type="submit" className={`session-button ${editingSession ? 'update-button' : 'create-button'}`}>
            {editingSession ? 'Update Session' : 'Add Session'}
          </button>
          {editingSession && (
            <button
              type="button"
              onClick={resetForm}
              className="session-button cancel-button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="session-display">
        <h2 className="session-list-header">Session Directory</h2>
        {sessions.length > 0 ? (
          <table className="session-table">
            <thead>
              <tr>
                <th>Therapist</th>
                <th>Client</th>
                <th>Date</th>
                <th>Length (min)</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session.id} className="session-item">
                  <td>{getTherapistName(session.therapistId)}</td>
                  <td>{getClientName(session.clientId)}</td>
                  <td>{new Date(session.date).toLocaleDateString()}</td>
                  <td>{session.length}</td>
                  <td className="session-notes">{session.notes || '-'}</td>
                  <td className="session-actions">
                    <button
                      onClick={() => startEditing(session)}
                      className="session-button edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="session-button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="session-empty">No sessions found. Add a session above.</p>
        )}
      </div>
    </div>
  );
};

export default Session;