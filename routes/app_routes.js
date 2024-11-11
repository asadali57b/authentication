const express=require('express');
const auth=require("../middleware/auth");
const router=express.Router();
const AuthController=require("../controller/auth_controller");
const upload=require("../middleware/uploadFile");


router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
router.get('/profile/:id',auth,AuthController.getProfile);
router.put('/updateProfile/:id',upload.single('photo'),AuthController.updateProfile);
module.exports=router;