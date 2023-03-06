const userServices = require('../services/userServices');
const register = async (req,res) => {
    try{
        const {name,password} = req.body;
        const user = await userServices.register(name,password);
        res.status(200).json(user)
    }catch(error)
    {
        res.status(400).json({message : error.message})
    }
}

const login = async (req,res) => {
    try{
        const {name,password} = req.body;
        const user = await userServices.login(name,password);
        res.status(200).json(user)
    }catch(error)
    {
        res.status(400).json({message : error.message})
    }
}

const validate = async (req,res) => {
    res.status(200).json({message : "Validated"})
}

module.exports = {register,login,validate}