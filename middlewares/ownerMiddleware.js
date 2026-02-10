const { findPlaylistById } = require("../repositories/playlist.repository");
const { findUserById } = require("../repositories/user.repository");

const ownerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const user = await findUserById(userId);
    const playlist = await findPlaylistById(id);

    if (playlist.userId !== userId && user.role !== "ADMIN") {
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

module.exports = ownerMiddleware;
