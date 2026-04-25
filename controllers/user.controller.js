const usermodel = require("../models/user.model");
const carModel = require("../models/car.model");

module.exports.esmfct = async (req, res) => {
  try {
    // Implement your logic here, for example:
    res.status(200).json({ message: "User function called" });
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await usermodel.find();
    res.status(200).json({ message: "User function called", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

module.exports.addUserClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new usermodel({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};

module.exports.addUserAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = new usermodel({ email, password, role: "admin" });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Admin user added successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding admin user", error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await usermodel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {nom , prenom , age , adresse , sexe} = req.body;
    const updatedUser = await usermodel.findByIdAndUpdate(id, { nom, prenom, age, adresse, sexe }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

module.exports.addUserClientWithImg = async (req, res) => {
  try {
    const { email, password } = req.body;
    const image_user = req.file ? req.file.path : null;


    const newUser = new usermodel({ email, password ,image_user });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }    
    const user = await usermodel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await usermodel.findByIdAndDelete(id);

    await carModel.updateMany({ owner: id }, { $unset: { owner: "" } });

    //await carModel.deleteMany({ owner: id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });  
        
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.login(email, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error: error.message });
  } 
};