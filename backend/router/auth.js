const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth/auth");

const router = Router();

// Crear nuevos usuarios
router.post("/new", crearUsuario);

// Login
router.post("/", login);

// Renew Token
router.get("/renew", renewToken);

module.exports = router;
