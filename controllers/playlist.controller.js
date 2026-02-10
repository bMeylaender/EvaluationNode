const playlistService = require("../services/playlist.service");

const createPlaylist = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.userId;

    playlistData = { ...data, userId: userId };

    const result = await playlistService.createPlaylist(playlistData);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const fetchPlaylistsByUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    const playlists = await playlistService.fetchPlaylistsByUser(userId);

    res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};

const fetchPlaylistById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const playlist = await playlistService.fetchPlaylistById(id);

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

const updatePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const result = await playlistService.updatePlaylist(id, newData);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const deletePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await playlistService.deletePlaylist(id);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const addAlbumToPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { albumId } = req.body;

    const result = await playlistService.addAlbumToPlaylist(
      parseInt(id),
      albumId,
    );

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const removeAlbumFromPlaylist = async (req, res, next) => {
  try {
    const { id, albumId } = req.params;

    const result = await playlistService.removeAlbumFromPlaylist(id, albumId);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlaylist,
  fetchPlaylistById,
  fetchPlaylistsByUser,
  removeAlbumFromPlaylist,
  addAlbumToPlaylist,
  updatePlaylist,
  deletePlaylist,
};
