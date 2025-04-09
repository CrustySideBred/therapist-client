const Client = require('../models/Client');

// Get ALL clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create client
exports.createClient = async (req, res) => {
  const { name, email, phone, regularity } = req.body;
  
  try {
    const newClient = new Client({
      name,
      email,
      phone,
      regularity
    });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, regularity } = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, email, phone, regularity },
      { new: true }
    );
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await Client.findByIdAndDelete(id);
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};