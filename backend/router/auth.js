const { Router } = require("express");
const { createUser, login, renewToken } = require("../controllers/auth/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

// Crear nuevos usuarios
router.post(
  "/new",
  [
    check("name", "Name is not valid").isString().not().isEmpty(),
    check("password", "Password is not valid").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    validateFields,
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is not valid").not().isEmpty(),
    validateFields,
  ],
  login
);

// Renew Token
router.get("/renew", renewToken);

module.exports = router;
