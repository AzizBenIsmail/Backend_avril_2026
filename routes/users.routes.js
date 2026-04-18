var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const uploadfile = require('../middleware/uploadfile')
/* GET users listing. */
router.get('/getAllUsers', userController.getAllUsers);
router.post('/addUserClient', userController.addUserClient);
router.post('/addUserClientWithImg',uploadfile.single("image_user"), userController.addUserClientWithImg);
router.post('/addUserAdmin', userController.addUserAdmin);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/getUserById/:id', userController.getUserById);
router.put('/updateUser/:id', userController.updateUser);
module.exports = router;
