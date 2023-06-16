const { generateToken } = require("../config/jsonToken");
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')

//Creation d'un user
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

//Connexion d'un user
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //on verifie si l'utilisateur exite
    const findUser = await User.findOne({email})
    if(findUser && await findUser.isPasswordMatched(password))
    {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    }else
    {
        throw new Error('Invalid crebdentials')
    }
});

//Recuperation de tous les utilisateurs
const getAllUsers = asyncHandler(async(req, res) => {
    try
    {
        const getUsers = await User.find();
        res.json(getUsers);
    }catch(error){
        throw new Error(error);
    }
})

//Recuperation d'un user
const getUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try
    {
        const getUser = await User.findById(id);
        res.json(getUser)
    }catch(error)
    {
        throw new Error(error)
    }
})

module.exports = {createUser, loginUser, getAllUsers, getUser}