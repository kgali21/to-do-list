require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const client = require('./lib/client');

const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, display_name as "displayName"
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        console.log('user', user);
        console.log('hash', hash);
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName"
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', ensureAuth);

app.get('/api/items', (req, res) => {
    const showAll = (req.query.show && req.query.show.toLowerCase() === 'all');
    const where = showAll ? '' : 'WHERE incomplete = FALSE';

    client.query(`
        SELECT 
            id,
            name,
            incomplete
        FROM items
        ${where}
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/items', (req, res) => {
    const item = req.body;
    client.query(`
        INSERT INTO items (name)
        VALUES ($1)
        RETURNING *;
    `, [item.name]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Item "${item.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const item = req.body;
    client.query(`
        UPDATE items
        SET name = $2,
            incomplete = $3
        WHERE id = $1
        RETURNING *;
    `,
    [id, item.name, item.incomplete]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Type "${item.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM items
        WHERE id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23503') {
                res.status(400).json({
                    error: `Could not remove, item is in use. Make incomplete or delete all of that item first`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/api/test', (req, res) => {
    res.json({
        message: `the user's id is ${req.userId}`
    });
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});