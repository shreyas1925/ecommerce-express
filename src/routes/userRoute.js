const express = require('express');
const router = express.Router();
const {register,login,validate} = require('../controllers/userController');
const { authUser } = require('../middlewares/authMiddleware');

router.post('/register',register);
router.post('/login',login)
router.get('/validate',authUser,validate)


module.exports = {userRoute : router}