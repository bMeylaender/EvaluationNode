const { artist } = require("../config/prisma-client");
const albumRepository = require("../repositories/album.repository");
const artisteService = require("../services/artiste.service");

const fetchAllAlbums = async (search) => {
  const albums = await albumRepository.findAllAlbums(search);

  if (albums.length <= 0) {
    throw {
      status: 404,
      message: "Aucun album trouvé",
    };
  }

  return albums;
};

const fetchAlbumById = async (id) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  const album = await albumRepository.findAlbumById(id);

  if (!album) {
    throw {
      status: 404,
      message: "Album Introuvable",
    };
  }

  return album;
};

const addAlbum = async (albumData) => {
  await artisteService.fetchArtisteById(albumData["artistId"]);

  const newAlbum = await albumRepository.addAlbum(albumData);

  return {
    status: 201,
    message: "Album ajouté avec succès",
    data: newAlbum,
  };
};

const updateAlbum = async (id, newData) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  await fetchAlbumById(id);

  const updatedAlbum = await albumRepository.updateAlbum(id, newData);

  return {
    status: 200,
    message: "Album mis à jour avec succès",
    data: updatedAlbum,
  };
};

const deleteAlbum = async (id) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  await fetchAlbumById(id);

  await albumRepository.deleteAlbum(id);

  return {
    status: 204,
    message: "Album supprimé avec succès",
  };
};

module.exports = {
  fetchAllAlbums,
  fetchAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
