const User = require("../models/userModel")


const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email})
    if(!findUser)
    {
        //Creation d'un utilisateur
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        //L'utilisateur existe deja
        res.json({
            msg: "L'utilisateur existe deja",
            success: false
        });
    }
};

module.exports = {createUser}