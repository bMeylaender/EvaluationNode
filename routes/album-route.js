const express = require("express");
const albumController = require("../controllers/album.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/multer-config");

const router = express.Router();

router.get("/", albumController.fetchAllAlbums);
router.get("/:id", albumController.fetchAlbumByID);
router.post(
  "/",
  authMiddleware,
  upload.single("cover"),
  albumController.addAlbum,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("cover"),
  albumController.updateAlbum,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  albumController.deleteAlbum,
);

module.exports = router;
