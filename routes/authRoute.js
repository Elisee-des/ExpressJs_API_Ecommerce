const express = require("express");
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unBlockUser } = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id", authMiddleware, isAdmin,getUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", authMiddleware, updateUser);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unBlockUser);


module.exports=router;