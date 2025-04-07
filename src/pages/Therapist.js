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
        const newTherapist = {
            title,
            name,
            email,
            location,
            yearsOfPractice,
            availability
        };
        await axios.post('http://localhost:3001/api/therapists', newTherapist);
        fetchTherapists();
        resetForm();
    }
    catch (error){
        console.error('Error creating a new therapist:',error);
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
    </div>
  )
}  
