const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
 id: String,
 device: String,
 sensor: String,
 status: String,
 sensorData: Array
}));
