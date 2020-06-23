const express = require("express");
const userControllers = require("../controllers/user");
const isAuth =require("../middleware/is-auth");

const router = express.Router();

router.get("/",userControllers.home);

router.get("/user",isAuth,userControllers.User);

router.get("/chat",isAuth,userControllers.chat);



module.exports = router;