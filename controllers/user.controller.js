const usermodel = require('../models/user.model');

module.exports.esmfct = async (req, res) => {
    try {
        // Implement your logic here, for example:
        res.status(200).json({ message: "User function called" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred" });
    }
}


module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await usermodel.find();
        res.status(200).json({ message: "User function called", users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}