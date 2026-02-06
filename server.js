const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3002;
const connection = mysql.createConnection({
    host: '172.29.18.116',
    user: 'Demo',
    password: 'Demo',
    database: 'BddArthur',
});

console.log('Connexion réussie à la base de données');

connection.on('error', (err) => {
    console.error('Erreur connexion MySQL:', err);
});

app.use(express.json());
app.use(express.static('public'));


const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

server.on('error', (err) => {
    console.error('Erreur serveur:', err);
    process.exit(1);
});