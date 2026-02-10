const { findUserById } = require("../repositories/user.repository");

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await findUserById(userId);

    if (user.role !== "ADMIN") {
      throw {
        status: 403,
        message: "Accès refusé",
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
