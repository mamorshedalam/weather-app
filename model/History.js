const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
     icon: String,
     name: String,
     country: String,
     main: String,
     description: String,
     temp: Number,
     pressure: Number,
     humidity: Number
});

module.exports = mongoose.model('History', historySchema);