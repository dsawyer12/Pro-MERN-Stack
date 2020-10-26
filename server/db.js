
require('dotenv').config();
const mongoose = require('mongoose');

let db;

async function connectToDB() {
    await mongoose.connect(process.env.MongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then( () => {
            console.log('Connected to database...');
            db = mongoose.connection.db;
        })
        .catch(err => console.log(err));
}

function getDB() {
    return db;
}

module.exports = { connectToDB, getDB };
