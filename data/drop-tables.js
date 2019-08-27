const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
           DROP TABLE IF EXISTS items
        );
        `);
    })
    .then(
        () => console.log('drop tables comeplete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });