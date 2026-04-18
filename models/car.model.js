const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    marque: { type: String, required: true },
    modele: { type: String },
    annee: { type: Number },
    couleur: String,
    prix: { type: Number, required: true },
    kilometrage: Number,
    carburant: { type: String, enum: ["essence", "diesel", "electrique", "hybride"] },
    transmission: { type: String, enum: ["manuelle", "automatique"] },
    puissance: Number, // en chevaux
    description: String,
    image_voiture: String,
    disponible: { type: Boolean, default: true },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;