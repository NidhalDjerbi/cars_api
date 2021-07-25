var mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://nidhal:nidhal123@cluster0.koaqr.mongodb.net/cars_db?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    

module.exports = db