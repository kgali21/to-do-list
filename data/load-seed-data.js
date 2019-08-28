const client = require('../lib/client');
const items = require('./items');


Promise.all(
    items.map(item => {
        return client.query(`
                    INSERT INTO items (name)
                    VALUES ($1)
                    RETURNING *;
                `,
        [item])
            .then(result => result.rows[0]);
    })
)
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });