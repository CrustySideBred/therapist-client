const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Therapist = sequelize.define('Therapist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.']]
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  yearsOfPractice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  availability: {
    type: DataTypes.ENUM('TAKING CLIENTS', 'NOT TAKING CLIENTS'),
    allowNull: false,
    defaultValue: 'TAKING CLIENTS'
  }
}, {
  timestamps: true
});

module.exports = Therapist;