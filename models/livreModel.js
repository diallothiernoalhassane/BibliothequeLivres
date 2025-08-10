const mongoose = require('mongoose');

const livreModel = new mongoose.Schema({
    titre:{
        type:String,
        required:true,
        trim:true
    },
    auteur:{
        type:String,
        required:true,
        trim:true
    },
    resume:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model('Livres',livreModel);
