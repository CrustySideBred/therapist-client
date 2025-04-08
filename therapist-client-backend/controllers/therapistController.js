const Therapist = require('../models/Therapist');

//Get ALL therapists 
exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Creates
exports.createTherapist = async (req, res) => {
  const { title, name, email, location, yearsOfPractice, availability } = req.body;
  
  try {
    const newTherapist = new Therapist({
      title,
      name,
      email,
      location,
      yearsOfPractice,
      availability
    });
    const savedTherapist = await newTherapist.save();
    res.status(201).json(savedTherapist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3. Updates
exports.updateTherapist = async (req, res) => {
  const { id } = req.params;
  const { title, name, email, location, yearsOfPractice, availability } = req.body;

  try {
    const updatedTherapist = await Therapist.findByIdAndUpdate(
      id,
      { title, name, email, location, yearsOfPractice, availability },
      { new: true } //this returns the updated comment
    );
    res.json(updatedTherapist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4. Delete 
exports.deleteTherapist = async (req, res) => {
  const { id } = req.params;

  try {
    await Therapist.findByIdAndDelete(id);
    res.json({ message: 'Therapist deleted successfully' });
  } catch (err) {
    res.status(500).json({message : err.message});
  }
};