const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer"))
    {
        token = req?.headers?.authorization.split(" ")[1]
        try {
            if(token)
            {
                const decoded = jwt.verify(token, process.env.JWT_TOKEN);
                const user = await User.findById(decoded.id)
                req.user = user;
                next();
            }
        }
        catch(error)
        {
            throw new Error("Not authorized token, Please login again")
        }
    }else {
        throw new Error("THere is not token attached of to hearder")
    }
});

const isAdmin = asyncHandler(async(req, res, next) => {
    const {email} = req.user;
    const adminUser = await User.findOne({ email })
    if(adminUser.role !== "admin")
    {
        throw new Error("Vous n'etes pas administrateur");
    }else{
        next();
    }
})

module.exports = {authMiddleware, isAdmin}