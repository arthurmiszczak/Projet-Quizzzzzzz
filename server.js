const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3002;
const connection = mysql.createConnection({
    host: '172.29.18.116',
    user: 'Demo',
    password: 'Demo',
    database: 'BddQuizz',
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


app.post('/register', (req, res) => {
    console.log('Données reçues pour l\'inscription');
    console.log(req.body);

    connection.query(
      'INSERT INTO Users (login, password) VALUES (?, ?)',
      [req.body.input, req.body.password],
      (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'insertion dans la base de données :', err);
          res.status(500).json({ message: 'Erreur serveur' });
          return;
        }
        console.log('Insertion réussie, ID utilisateur :', results.insertId);
        res.json({ message: 'Inscription réussie !', userId: results.insertId });
      }
    );
});
