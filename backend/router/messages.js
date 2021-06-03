const { Router } = require("express");
const obtainChat = require("../controllers/messages/messages");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:from", validateJWT, obtainChat);

module.exports = router;
