import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Therapist.css'; // Assuming you'll create a corresponding CSS file

const Therapist = () => {
  //therapists fields
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [yearsOfPractice, setYearsOfPractice] = useState('');
  const [availability, setAvailability] = useState('TAKING CLIENTS');

  //therapists data + editing
  const [therapists, setTherapists] = useState([]);
  const [editingTherapist, setEditingTherapist] = useState(null);

  //fetching info from backend
  const fetchTherapists = async () => {
    try{
        const response = await axios.get('http://localhost:3001/api/therapists');
        setTherapists(response.data);
    }
    catch (error) {
        console.error('Error fetching therapists data:', error);
    }
  };

  //creating a new therapist
  const createTherapist = async () => {
    try {
      // Validate required fields
      if (!title || !name || !email || !location || !yearsOfPractice) {
        alert('Please fill all required fields');
        return;
      }
  
      const newTherapist = {
        title,
        name,
        email,
        location,
        yearsOfPractice: Number(yearsOfPractice), // Ensure it's a number
        availability
      };
  
      console.log('Sending data:', newTherapist); // Debug log
      
      const response = await axios.post('http://localhost:3001/api/therapists', newTherapist);
      console.log('Response:', response.data); // Debug log
      
      fetchTherapists();
      resetForm();
    } catch (error) {
      console.error('Error creating therapist:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Failed to create therapist'}`);
      } else {
        alert('Network error - please check console for details');
      }
    }
  };

  //updating a therapist
  const updateTherapist = async () => {
    try {
        const updatedTherapist = {
            title,
            name,
            email,
            location,
            yearsOfPractice,
            availability
        };
        await axios.put(`http://localhost:3001/api/therapists/${editingTherapist.id}`, 
        updatedTherapist);
        fetchTherapists();
        setEditingTherapist(null);
        resetForm();
    }
    catch(error){
        console.error('Error updating the therapist:',error);
    }
  };

  // editing a therapist
  const startEditing = (therapist) => {
    setEditingTherapist(therapist);
    setTitle(therapist.title);
    setName(therapist.name);
    setEmail(therapist.email);
    setLocation(therapist.location);
    setYearsOfPractice(therapist.yearsOfPractice);
    setAvailability(therapist.availability);
  };

  // Reset 
  const resetForm = () => {
    setTitle('');
    setName('');
    setEmail('');
    setLocation('');
    setYearsOfPractice('');
    setAvailability('TAKING CLIENTS');
  };

  //delete a therapist
  const deleteTherapist = async(id) => {
    try{
        await axios.delete(`http://localhost:3001/api/therapists/${id}`);
        fetchTherapists();
    }
    catch(error){
        console.error('Error deleting therapist:',error);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  return (
    <div className="therapist-container">
        <h1 className="therapist-header">Meet our Therapists!</h1>

        <div className="therapist-editing">
            <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className = "therapist-input"
            >
            <option value="">Select Title</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            </select>

            <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="therapist-input"
            />

            <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="therapist-input"
            />

            <input
             type="text"
             placeholder="Location"
             value={location}
             onChange={(e) => setLocation(e.target.value)}
             className="therapist-input"
            />

            <input
             type="number"
             placeholder="Years of Practice"
             value={yearsOfPractice}
             onChange={(e) => setYearsOfPractice(e.target.value)}
             className="therapist-input"
             min="0"
            />

            <select
             value={availability}
             onChange={(e) => setAvailability(e.target.value)}
             className="therapist-input"
            >
             <option value="TAKING CLIENTS">Taking Clients</option>
             <option value="NOT TAKING CLIENTS">Not Taking Clients</option>
            </select>

            {editingTherapist ? (
             <div className="therapist-form-buttons">
              <button onClick={updateTherapist} className="therapist-button update-button">
                Update Therapist
              </button>
              <button 
                 onClick={() => {
                 setEditingTherapist(null);
                 resetForm();
               }} 
               className="therapist-button cancel-button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={createTherapist} className="therapist-button create-button">
            Add Therapist
          </button>
        )}
        </div>

        <div className="therapist-display">
            <h2 className="therapist-list-header">Therapist Directory</h2>
            {therapists.length > 0 ? (
                therapists.map((therapist)=> (
                    <div key={therapist.id} className="therapist-item">
                      <p className="therapist-name">{therapist.title} {therapist.name}</p>
                      <p className="therapist-email">Email: {therapist.email}</p>
                      <p className="therapist-location">Location: {therapist.location}</p>
                      <p className="therapist-experience">Years of Practice: {therapist.yearsOfPractice}</p>  
                      <p className={`therapist-availability ${therapist.availability === 'TAKING CLIENTS' ? 'available' : 'not-available'}`}>
                       Status: {therapist.availability}
                      </p>
                      <div className="therapist-action">
                        <button 
                        onClick={() => startEditing(therapist)}
                        className="therapist-button edit-button"
                        >
                            Edit
                        </button>
                        <button
                         onClick={() => deleteTherapist(therapist.id)} 
                         className="therapist-button delete-button"
                       >
                         Delete
                       </button>
                     </div>
                    </div>
                ))
            ) : (
                <p className="therapist-empty"> No therapists found. Add a therapist above.</p>
            )}
        </div>
    </div>
  );
};

export default Therapist;
