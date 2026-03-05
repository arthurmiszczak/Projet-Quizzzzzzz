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
    const { login, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login)) {
        res.status(400).json({ message: 'Email invalide, il doit contenir un @' });
        return;
    }

    connection.query(
      'INSERT INTO Users (login, password) VALUES (?, ?)',
      [req.body.login, req.body.password],
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
app.post('/score', (req, res) => {
    const { userId, quizId, score, total } = req.body;

    if (!userId || !quizId || score === undefined) {
        return res.status(400).json({ message: 'Données manquantes' });
    }

    connection.query(
        'INSERT INTO Scores (userId, quizId, score, total) VALUES (?, ?, ?, ?)',
        [userId, quizId, score, total],
        (err, results) => {
            if (err) {
                console.error('Erreur sauvegarde score :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }
            res.json({ message: 'Score sauvegardé !', scoreId: results.insertId });
        }
    );
});
app.get('/scores/:userId', (req, res) => {
    connection.query(
        'SELECT * FROM Scores WHERE userId = ? ORDER BY createdAt DESC',
        [req.params.userId],
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            res.json(results);
        }
    );
});