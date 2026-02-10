const express = require("express");
const playlistController = require("../controllers/playlist.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const ownerMiddleware = require("../middlewares/ownerMiddleware");

const router = express.Router();

router.post("/", authMiddleware, playlistController.createPlaylist);
router.get("/me", authMiddleware, playlistController.fetchPlaylistsByUser);
router.get("/:id", playlistController.fetchPlaylistById);
router.put(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  playlistController.updatePlaylist,
);
router.delete(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  playlistController.deletePlaylist,
);
router.post(
  "/:id/albums",
  authMiddleware,
  ownerMiddleware,
  playlistController.addAlbumToPlaylist,
);
router.delete(
  "/:id/albums/:albumId",
  authMiddleware,
  ownerMiddleware,
  playlistController.removeAlbumFromPlaylist,
);

module.exports = router;
