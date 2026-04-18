const carModel = require("../models/car.model");
const userModel = require("../models/user.model");

module.exports.getAllCars = async (req, res) => {
  try {
    const cars = await carModel.find()
    res.status(200).json({ message: "Voitures récupérées avec succès", cars });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des voitures", error: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    res.status(200).json({ message: "Voiture trouvée", car });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la voiture", error: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const carData = req.body;
    if (req.file) {
      carData.image_voiture = req.file.path;
    }

    const newCar = new carModel(carData);
    await newCar.save();

    res.status(201).json({ message: "Voiture ajoutée avec succès", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la voiture", error: error.message });
  }
};

module.exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image_voiture = req.file.path;
    }

    const updatedCar = await carModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    res.status(200).json({ message: "Voiture mise à jour avec succès", car: updatedCar });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la voiture", error: error.message });
  }
};

module.exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await carModel.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    res.status(200).json({ message: "Voiture supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la voiture", error: error.message });
  }
};

module.exports.getAvailableCars = async (req, res) => {
  try {
    const cars = await carModel.find({ disponible: true })
    res.status(200).json({ message: "Voitures disponibles récupérées", cars });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des voitures disponibles", error: error.message });
  }
};

module.exports.addCarToUser = async (req, res) => {
  try {
    const { userId, carId } = req.params;
    const car = await carModel.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    car.owner = userId;
    await car.save();

    user.cars.push(carId);
    await user.save();

    res.status(200).json({ message: "Voiture associée à l'utilisateur avec succès", car });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'association de la voiture à l'utilisateur", error: error.message });
  }
};

module.exports.removeCarFromUser = async (req, res) => {