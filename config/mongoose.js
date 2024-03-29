const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind('Error connecting to the MongoDB'));

db.once('open', function(){
    console.log('Connected to the database :: MongoDB');
});

module.exports = db;