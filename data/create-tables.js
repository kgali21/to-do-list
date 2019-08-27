const client = require('../lib/client');

client.connect()
    .then(() => {
        `
        CREATE TABLE items (
            id SERIAL PRIMARY KEY NOT NULL,
            nam VARCHAR(256) NOT NULL UNIQUE,
            incomplete BOOLEAN NOT NULL DEFAULT FALSE
        );
        `;
    })
    .then(
        () => console.log('create tables comeplete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });