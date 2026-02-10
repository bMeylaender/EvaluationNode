const playlistRepository = require("../repositories/playlist.repository");

const createPlaylist = async (playlistData) => {
  const newPlaylist = await playlistRepository.createPlaylist(playlistData);

  return {
    status: 201,
    message: "Playlist créée avec succès",
    data: newPlaylist,
  };
};

const fetchPlaylistsByUser = async (idUser) => {
  if (!idUser) {
    throw {
      status: 400,
      message: "Id de l'utilisateur requis",
    };
  }

  const playlists = await playlistRepository.findPlaylistsByUser(idUser);

  if (playlists.length <= 0) {
    throw {
      status: 404,
      message: "Aucune playlist touvée",
    };
  }

  return playlists;
};

const fetchPlaylistById = async (id) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  const playlist = await playlistRepository.findPlaylistById(id);

  if (!playlist) {
    throw {
      status: 404,
      message: "Playlist Introuvable",
    };
  }

  return playlist;
};

const updatePlaylist = async (id, newData) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  await fetchPlaylistById(id);

  const updatedPlaylist = await playlistRepository.updatePlaylist(id, newData);

  return {
    status: 200,
    message: "Playlist mis à jour avec succès",
    data: updatedPlaylist,
  };
};

const deletePlaylist = async (id) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  await fetchPlaylistById(id);

  await playlistRepository.deletePlaylist(id);

  return {
    status: 204,
    message: "Playlist supprimé avec succès",
  };
};

const addAlbumToPlaylist = async (idPlaylist, idAlbum) => {
  if (!idPlaylist || !idAlbum) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  const isAlreadyIn = await playlistRepository.isAlbumInPlaylist(
    idPlaylist,
    idAlbum,
  );

  if (isAlreadyIn) {
    throw {
      status: 409,
      message: "L'album est déjà dans la playlist",
    };
  }

  await playlistRepository.addAlbumToPlaylist(idPlaylist, idAlbum);

  return {
    status: 201,
    message: "Album ajouté à la playlist avec succès",
  };
};

const removeAlbumFromPlaylist = async (idPlaylist, idAlbum) => {
  if (!idPlaylist || !idAlbum) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  const isAlreadyIn = await playlistRepository.isAlbumInPlaylist(
    idPlaylist,
    idAlbum,
  );

  if (!isAlreadyIn) {
    throw {
      status: 404,
      message: "L'album n'est pas dans la playlist",
    };
  }

  await playlistRepository.removeAlbumFromPlaylist(idPlaylist, idAlbum);

  return {
    status: 204,
    message: "Album supprimé de la playlist avec succès",
  };
};

module.exports = {
  createPlaylist,
  fetchPlaylistById,
  fetchPlaylistsByUser,
  addAlbumToPlaylist,
  removeAlbumFromPlaylist,
  updatePlaylist,
  deletePlaylist,
};
