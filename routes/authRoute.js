const express = require("express");
const { 
    createUser, 
    loginUser, 
    getAllUsers, 
    getUser, 
    deleteUser,
    updateUser, 
    blockUser, 
    unBlockUser, 
    handldeRefreshToken,
    logout} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/refresh", handldeRefreshToken);
router.get("/logout", logout);
router.delete("/delete/:id", deleteUser);
router.get("/:id", authMiddleware, isAdmin,getUser);
router.put("/update/:id", authMiddleware, updateUser);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unBlockUser);


module.exports=router;