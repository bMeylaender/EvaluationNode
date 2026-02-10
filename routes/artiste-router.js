const express = require("express");
const artisteController = require("../controllers/artiste.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const upload = require("../middlewares/multer-config");

const router = express.Router();

router.get("/", artisteController.fetchAllArtistes);
router.get("/:id", artisteController.fetchArtisteByID);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("photo"),
  artisteController.addArtiste,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("photo"),
  artisteController.updateArtiste,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  artisteController.deleteArtiste,
);

module.exports = router;
