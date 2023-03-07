const express = require('express');
const router = express.Router();
const {register,login,validate} = require('../controllers/userController');
const { authUser } = require('../middlewares/authMiddleware');

router.post('/register',register);
router.post('/login',login)



// router.get('/validate',authUser,validate)


module.exports = {userRoute : router}
// "eyJhbGciOiJIUzI1NiJ9.c2hhc2h3YXRo.uNn0PsGV-e5gcA7vi2t04iOEKqwEajIViGgEnKD18cY"
// eyJhbGciOiJIUzI1NiJ9.c2hyZXlhcw.uPU2EoepISSxlUPlnHibymGonnuhPI9ct6rZVmBnn2s