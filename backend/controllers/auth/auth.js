const { response } = require("express");
const User = require("../../database/models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../../helpers/jwt");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const emailTaken = await User.findOne({ email });

    if (emailTaken) {
      return res.status(400).json({
        ok: false,
        msg: "Email is already taken",
      });
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password.toString(), salt);

    await user.save();

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact an administrator.",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "Failure while loggin in",
      });
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(
      password.toString(),
          dbUser.password
    );

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Failure while loggin in",
      });
    }

    // Generar JWT
    const token = await generateJWT(dbUser.id);

    res.json({
      ok: true,
      user: dbUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact an administrator.",
    });
  }
};

const renewToken = async (req, res) => {

  const uid = req.uid;

  const token = await generateJWT(uid);

  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
