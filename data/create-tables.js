const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
        CREATE TABLE items (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(256) NOT NULL UNIQUE,
            incomplete BOOLEAN NOT NULL DEFAULT FALSE
        );
        `);
    })
    .then(
        () => console.log('create tables comeplete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });