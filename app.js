require('dotenv').config();
// INPUT ASSIGN
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

// DATABASE CONNECTION
connectDB();

// EXPRESS INITIALIZATION
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, '/public')));

// ROUTE
app.use('/history', require('./routes/api'));

// RUN SERVE
const PORT = process.env.PORT || 4000;
mongoose.connection.once('open', () => {
     console.log('Connected to MongoDB');
     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})