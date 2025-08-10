const mongoose = require('mongoose');

function connectDb(){
    return mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log('Connexion réussie avec mongodb')})
    .catch((err)=> console.log('Erreur de connexion !'))
}

module.exports = connectDb;
