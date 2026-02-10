const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const register = async (userData) => {
  const { email, password, name } = userData;

  const user = await userRepository.findUserByEmail(email);

  if (user) {
    throw {
      status: 409,
      message: "Email déjà utilisée",
    };
  }

  const hash = await bcrypt.hash(password, 10);

  const newUserData = {
    email: email,
    password: hash,
    name: name,
  };

  return await userRepository.addUser(newUserData);
};

const login = async (body) => {
  const { email, password } = body;

  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw {
      status: 401,
      message: "Email ou mot de passe invalide",
    };
  }

  const isVerify = await bcrypt.compare(password, user.password);

  if (!isVerify) {
    throw {
      status: 401,
      message: "Identifiant ou mdp invalide",
    };
  }

  const payload = {
    sub: user.name,
    userId: user.id,
  };

  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "24h" });

  return { token, userId: user.id };
};

module.exports = {
  register,
  login,
};
