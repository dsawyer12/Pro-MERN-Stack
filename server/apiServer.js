require('dotenv').config();
const express = require('express');
const { connectToDB } = require('./db.js');
const { installHandler } = require('./api_handler.js');

const app = express();
installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
    try {
        await connectToDB();
        app.listen(port, () => {
            console.log(`API server running on port ${port}...`);
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
}());

// function temp() {
//     db.listCollections().toArray((err, names) => {
//         console.log(names);
//         module.exports.Collection = names;
//     });
//
//     db.collection('counters').insertOne({name: "issues", current: 2}, (err, res) => {
//         if (err) throw err;
//         console.log('issue counter add to counter collection');
//     });
// }