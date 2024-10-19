const mongoose = require('mongoose');


// MongoDB connection (replace with your MongoDB Atlas connection string)
const connectDb=()=>{
    mongoose.connect('mongodb+srv://pasupathi07777:MRpubg8903@pasupathi-db.g5eoa.mongodb.net/monito?retryWrites=true&w=majority&appName=pasupathi-DB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('MongoDB connected'))
        .catch((error) => console.error('MongoDB connection error:', error));
}

module.exports = connectDb
