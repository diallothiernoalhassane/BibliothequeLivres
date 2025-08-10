const Livres = require('../models/livreModel');


// Ajout des livres dans la base de données:
exports.ajoutLivre = async (req,res)=>{
    try{
        const {titre, auteur, resume} = req.body;
        if(!titre || !auteur) {
            return res.status(400).json({error:"Titre et auteur requis !"})
        }

        const nouveauLivre = new Livres({titre, auteur, resume});
        await nouveauLivre.save();
        res.status(201).json({message:"Livre ajouté avec succès !",livres:nouveauLivre})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.getLivre = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sautPage = (page - 1) * limit;

        // Champ de tri :
        let trier;
        if (req.query.sort && req.query.sort.toLowerCase() === 'livre') {
            trier = 'livre';
        } else {
            trier = 'titre';
        }

        // Ordre de tri :
        let ordreTri;
        if (req.query.order && req.query.order.toLowerCase() === 'asc') {
            ordreTri = 1;
        } else {
            ordreTri = -1;
        }

        const totalLivres = await Livres.countDocuments();

        // Pagination et tri :
        const livres = await Livres.find()
            .sort({ [trier]: ordreTri }) // correction ici
            .skip(sautPage) // correction ici
            .limit(limit);

        // La réponse :
        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalLivres / limit),
            totalLivres,
            trier,
            ordreTri,
            livres
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Afficher un livre spécifique:
exports.getLivreById = async (req,res)=>{
    try{
        const livre = await Livres.findById(req.params.id);
        if(!livre){
            return res.status(404).json({error: "Livre non trouvé !"})
        }
        await livre.save();
        res.json({livre})

    }catch(err){
        res.status(400).json({error: "Id invalide !"})
    }
}

// Modifer un livre:
exports.modifierLivre = async (req,res)=>{
    try{
        const {titre, auteur, resume} = req.body;
        if(!titre || !auteur) return res.status(404).json({error:"Titre et auteur requis !"})
        
        const livreModifier = await Livres.findByIdAndUpdate(
            req.params.id,
            {titre, auteur, resume},
            {new:true}
        )
        if(!livreModifier){
            return res.status(404).json({error: 'Au moins un élément doit être modifier'})
        }

        await livreModifier.save();
        res.status(201).json({message:"Livre modifié avec succès !",livres:livreModifier})

    }catch(err){
        res.status(500).json({error:"Erreur de serveur !"})
    }
}

// Suppression d'un livre:
exports.supprimerLivre = async (req,res)=>{
    try{
        const supprimer = await Livres.findByIdAndDelete(req.params.id);
        if(!supprimer){
            return res.status(404).json({error:"Livre non trouvé !"})
        }
        res.status(201).json({message:"Livre supprimé avec succès !"})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

