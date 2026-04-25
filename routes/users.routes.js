var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const uploadfile = require('../middleware/uploadfile')
const {requireAuthUser} = require('../middleware/authMiddlewares')
const {ControledAcces} = require('../middleware/ControledAcces')
/* GET users listing. */
router.get('/getAllUsers',requireAuthUser,ControledAcces, userController.getAllUsers);
router.post('/addUserClient', userController.addUserClient);
router.post('/addUserClientWithImg',requireAuthUser,uploadfile.single("image_user"), userController.addUserClientWithImg);
router.post('/addUserAdmin',requireAuthUser, userController.addUserAdmin);
router.delete('/deleteUser/:id',requireAuthUser, userController.deleteUser);
router.get('/getUserById/:id',requireAuthUser, userController.getUserById);
router.put('/updateUser/:id',requireAuthUser, userController.updateUser);
router.post('/login', userController.login);
router.post('/logout',requireAuthUser, userController.logout);
module.exports = router;
