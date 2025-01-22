const express =require('express');
const router =express.Router();

const {createUser, getUser, getUsers, updateUser, deleteUser} =require("../Controllers/userController");

router.post("/api/user/create",createUser);
router.get("/api/user/getUser/:id", getUser);
router.get("/api/user/getUsers", getUsers);
router.put("/api/user/update/:id", updateUser);
router.delete("/api/user/delete/:id", deleteUser);

module.exports =router