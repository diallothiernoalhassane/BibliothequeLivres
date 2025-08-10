const express = require('express');
const app = express();
const livreModel = require('./models/livreModel');
const connectDb = require('./db');
const livresRoutes = require('./routes/livresRoutes')
require('dotenv').config();

// Connexion avec mongodb:
connectDb();

// Middleware:
app.use(express.json());

// Importation des routes:
app.use('/api',livresRoutes)



// Lancement du serveur:
app.listen(3000,()=>{
    console.log('Serveur lancé sur le port: 3000')
})

