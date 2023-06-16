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

//Edition d'un user
const updateUser = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user)
    {
        //Creation d'un utilisateur
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else if(user)
    {
        //Edition de l'utilisateur
        try
        {
            const editUser = await User.findByIdAndUpdate(
                _id, {
                    firstname: req?.body.firstname,
                    lastname:req?.body?.lastname,
                    email:req?.body?.email,
                    mobile:req?.body?.mobile,
            },
            {
                new: true
            }
            )
            res.json(editUser);
        }
        catch(error)
        {
            throw new Error(error)
        }

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

//Supprimer d'un user
const deleteUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try
    {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json(deleteUser)
    }catch(error)
    {
        throw new Error(error)
    }
})

const blockUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try
    {
        const block = await User.findByIdAndUpdate(
            id, {
            isBlocked:true
        }, 
        {
            new:true
        });
        res.json({message:"User blocked"});
    }catch(error)
    {
        throw new Error(error)
    }
});


//Deblocker un utilisateur
const unBlockUser = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try
    {
        const unBlock = await User.findByIdAndUpdate(
            id, {
            isBlocked:false
        }, 
        {
            new:true
        });
        res.json({message:"User unblocked"});
    }catch(error)
    {
        throw new Error(error)
    }
});

module.exports = {
    createUser, 
    loginUser, 
    getAllUsers, 
    getUser, 
    deleteUser, 
    updateUser,
    blockUser,
    unBlockUser
}