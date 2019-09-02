// make sure .env has been loaded
require('dotenv').config();
// "require" pg (after `npm i pg`)
const pg = require('pg');
// Use the pg Client
const Client = pg.Client;
// note: you will need to create the database!
const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client(DATABASE_URL);
// export the client

client.connect()
    .then(() => console.log('connected to database', DATABASE_URL))
    .catch(err => console.log('connection error', err));


client.on('error', err => {
    console.error('\n**** DATABASE ERROR ****\n\n', err);
});

module.exports = client;
