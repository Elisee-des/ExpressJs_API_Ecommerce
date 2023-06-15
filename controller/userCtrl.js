const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email})
    if(!findUser)
    {
        //Creation d'un utilisateur
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else{
        throw new Error("Utilisateur existe déja.")
    }
})

module.exports = {createUser}