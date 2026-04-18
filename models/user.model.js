const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    //user
    nom: String,
    prenom: String,
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Le password doit contenir au minimum 8 caractères avec au moins une majuscule, une minuscule et un chiffre",
      ],
    },
    age: Number,
    sexe: String,
    adresse: String,
    image_user: String,
    role: { type: String, enum: ["admin", "client"], default: "client" },

    //admin

    //client
    telephone: String,
    experience: String,

    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    
    student: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
