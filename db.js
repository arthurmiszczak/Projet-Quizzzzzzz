const mysql = require('mysql2');

// Configuration de la connexion
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Remplace si ton user est différent
    password: 'root',          // Remplace par ton mot de passe MySQL (vide si pas de mdp)
    database: 'BddQuizz'    // Remplace par le nom de ta base de données
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la BDD:', err);
        return;
    }
    console.log('✅ Connecté à la base de données MySQL');
});

module.exports = connection;