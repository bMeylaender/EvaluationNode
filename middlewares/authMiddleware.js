const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw {
        status: 401,
        message: "Token invalide",
      };
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authMiddleware;
