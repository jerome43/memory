/**
 * Le point d'entrée de notre application backend
 * Crée un serveur node.js avec le framework minimaliste "express"
 * @type {createApplication}
 */

const express = require("express");
const app = express();
const port = 3000;

// définition des header, permet de définir avec qui l'on accepte de communiquer, les méthodes Http autorisées...
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Pour pouvoir retourner et recevoir du json dans le body des requêtes Http
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Retourne un message de bienvenue sur la route principale de notre API
app.get('/', (req, res) => res.send('Hello World!'));

// Utilisation d'un routeur pour la route "/scores/" de notre API
const scoresRoutes = require('./routes/scores');
app.use("/scores", scoresRoutes);

// On lance notre serveur node
app.listen(port, () => console.log(`Example app listening on port ${port}!`));