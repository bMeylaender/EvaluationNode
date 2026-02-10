const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const user = await authService.register(bodyData);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const bodyData = req.body;

    const login = await authService.login(bodyData);

    res.status(200).json(login);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
