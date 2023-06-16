const express = require("express");
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = require("../controller/userCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id", getUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);


module.exports=router;