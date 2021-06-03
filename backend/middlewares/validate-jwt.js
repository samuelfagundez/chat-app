const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid token",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.uid = payload.uid;

    next();
  } catch (e) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
