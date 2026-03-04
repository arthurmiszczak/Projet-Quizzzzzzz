const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3002;
const connection = mysql.createConnection({
    host: '172.29.16.164',
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


app.get('/users', (req, res) => {
    connection.query('SELECT * FROM Users', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            res.status(500).json({ message: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
});



app.post('/connexion', (req, res) => {  
  const { login, password } = req.body;
  connection.query('SELECT * FROM Users WHERE login = ? AND password = ?', [login, password], (err, results) => {
      if (err) {
        console.error('Erreur lors de la vérification des identifiants :', err);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
      }
      if (results.length === 0) {
        res.status(401).json({ message: 'Identifiants invalides' });
        return;
      }
      // Identifiants valides 
      res.json({ message: 'Connexion réussie !', user: results[0] });
    });
});