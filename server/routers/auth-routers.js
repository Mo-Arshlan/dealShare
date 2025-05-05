const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const { requireSignIn, isAdmin } = require("../middlewares/auth-middleware");

// router object
const router = express.Router();

// routing
router.route('/').get(authControllers.home);

//* REGISTER || METHOD POST
router.route('/register').post(authControllers.register)

//* LOGIN || METHOD POST
router.route('/login').post(authControllers.login)

//* Protected User Route 
router.route('/user-auth').get(requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

//* Protected Admin Route 
router.route('/admin-auth').get(requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})


module.exports = router;