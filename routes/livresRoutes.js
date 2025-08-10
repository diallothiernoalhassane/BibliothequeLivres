const express = require('express');
const router = express.Router();
const livresControllers = require('../controllers/livresControllers');

//CRUD:

router.post('/livres',livresControllers.ajoutLivre);
router.get('/livres',livresControllers.getLivre);
router.get('/livres/:id',livresControllers.getLivreById);
router.put('/livres/:id',livresControllers.modifierLivre);
router.delete('/livres/:id',livresControllers.supprimerLivre)

// exportation de la route:
module.exports = router;

