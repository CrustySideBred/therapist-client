const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60,
    validate: {
      isIn: [[30, 45, 60, 90]]
    }
  }
}, {
  timestamps: true
});

// Define associations
const Therapist = require('./Therapist');
const Client = require('./Client');

Session.belongsTo(Therapist, { foreignKey: 'therapistId' });
Session.belongsTo(Client, { foreignKey: 'clientId' });

Therapist.hasMany(Session, { foreignKey: 'therapistId' });
Client.hasMany(Session, { foreignKey: 'clientId' });

module.exports = Session;