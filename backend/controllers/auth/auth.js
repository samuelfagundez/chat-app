const { response } = require("express");
const User = require("../../database/models/user");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    res.json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact an administrator.",
    });
  }

  res.json({
    ok: true,
    usuario: "ABC",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
  });
};

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
