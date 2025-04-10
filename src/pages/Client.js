import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Client.css'; 

const Client = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regularity, setRegularity] = useState('WEEKLY');

  //Client data 
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  //fetching info from backend
  const fetchClients = async () => {
    try{
        const response = await axios.get('http://localhost:3001/api/clients');
        setClients(response.data);
    }
    catch (error) {
        console.error('Error fetching clients data:', error);
    }
  };

  //creating a new clients
  const createClients = async () => {
    try {
        const newClient = {
            name,
            email,
            phone,
            regularity
        };
        await axios.post('http://localhost:3001/api/clients', newClient);
        fetchClients();
        resetForm();
    }
    catch (error){
        console.error('Error creating a new client:',error);
    }
  };

  //updating a client
  const updateClients = async () => {
    try {
        const updatedClients = {
            name,
            email,
            phone,
            regularity
        };
        await axios.put(`http://localhost:3001/api/clients/${editingClient.id}`, 
        updatedClients);
        fetchClients();
        setEditingClient(null);
        resetForm();
    }
    catch(error){
        console.error('Error updating the client:',error);
    }
  };

  // editing clients
  const startEditing = (client) => {
    setEditingClient(client);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setRegularity(client.regularity);
  };

  // Reset 
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setRegularity('WEEKLY');
  };

  //delete a therapist
  const deleteClient = async(id) => {
    try{
        await axios.delete(`http://localhost:3001/api/clients/${id}`);
        fetchClients();
    }
    catch(error){
        console.error('Error deleting client:',error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="client-container">
        <h1 className="client-header">Here are our Clients!</h1>

        <div className="client-editing">

            <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="client-input"
            />

            <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="client-input"
            />

            <input
             type="tel"
             placeholder="Phone Number"
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
             className="client-input"
            />

            <select
             value={regularity}
             onChange={(e) => setRegularity(e.target.value)}
             className="client-input"
            >
             <option value="WEEKLY">Weekly Appointments</option>
             <option value="MONTHLY">Monthly Appointments</option>
            </select>

            {editingClient ? (
             <div className="client-form-buttons">
              <button onClick={updateClients} className="client-button update-button">
                Update Clients
              </button>
              <button 
                 onClick={() => {
                 setEditingClient(null);
                 resetForm();
               }} 
               className="client-button cancel-button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={createClients} className="client-button create-button">
            Add Client
          </button>
        )}
        </div>

        <div className="client-display">
        <h2 className="client-list-header">Client Directory</h2>
        {clients.length > 0 ? (
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Appointment Regularity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="client-item">
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td className={`client-regularity ${client.regularity.toLowerCase()}`}>
                    {client.regularity}
                  </td>
                  <td className="client-actions">
                    <button
                      onClick={() => startEditing(client)}
                      className="client-button edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="client-button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="client-empty">No clients found. Add a client above.</p>
        )}
      </div>
    </div>
  );
};

export default Client;