const express = require("express");
const userControllers = require("../controllers/user");
const isAuth =require("../middleware/is-auth");

const router = express.Router();

router.get("/",userControllers.home);

router.get("/user",userControllers.User);

router.get("/avtar",userControllers.avtar);

module.exports = router;