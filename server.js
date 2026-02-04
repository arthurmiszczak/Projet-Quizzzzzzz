const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.error('Erreur serveur:', err);
    process.exit(1);
});
