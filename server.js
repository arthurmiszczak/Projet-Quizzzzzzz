const express = require('express');
const db = require('./db'); // Import de la connexion BDD
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.static('public'));

// Route de test pour vérifier la connexion BDD
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur BDD', details: err });
        }
        res.json({ message: 'Connexion BDD OK!', result: results[0].result });
    });
});

const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

server.on('error', (err) => {
    console.error('Erreur serveur:', err);
    process.exit(1);
});