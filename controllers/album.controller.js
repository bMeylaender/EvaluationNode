const albumService = require("../services/album.service");

const fetchAllAlbums = async (req, res, next) => {
  try {
    const albums = await albumService.fetchAllAlbums();

    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

const fetchAlbumByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await albumService.fetchAlbumById(parseInt(id));

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

const addAlbum = async (req, res, next) => {
  try {
    const albumData = req.body;

    const result = await albumService.addAlbum(albumData);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const result = await albumService.updateAlbum(id, newData);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await albumService.deleteAlbum(id);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAllAlbums,
  fetchAlbumByID,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
