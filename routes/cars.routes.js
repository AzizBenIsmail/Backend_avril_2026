const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const upload = require('../middleware/uploadfile');
const {requireAuthUser} = require('../middleware/authMiddlewares')

router.use(requireAuthUser); // Appliquer le middleware d'authentification à toutes les routes de ce routeur
// Routes CRUD pour les voitures

// GET /cars - Récupérer toutes les voitures
router.get('/', carController.getAllCars);

// GET /cars/available - Récupérer les voitures disponibles
router.get('/available', carController.getAvailableCars);

// GET /cars/:id - Récupérer une voiture par ID
router.get('/:id', carController.getCarById);

// POST /cars - Ajouter une nouvelle voiture (avec upload d'image optionnel)
router.post('/', upload.single('image'), carController.addCar);

// PUT /cars/:id - Mettre à jour une voiture (avec upload d'image optionnel)
router.put('/:id', upload.single('image'), carController.updateCar);

// DELETE /cars/:id - Supprimer une voiture
router.delete('/:id', carController.deleteCar);

module.exports = router;
