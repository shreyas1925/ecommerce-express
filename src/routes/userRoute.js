const express = require('express');
const router = express.Router();
const {register,login,getCartProducts} = require('../controllers/userController');
const { authUser } = require('../middlewares/authMiddleware');

router.post('/register',register);
router.post('/login',login)

router.get("/cartProducts/:userId",authUser,getCartProducts)
// router.get('/validate',authUser,validate)


module.exports = {userRoute : router}
