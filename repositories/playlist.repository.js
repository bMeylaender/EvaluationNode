const prisma = require("../config/prisma-client");

const createPlaylist = async (playlistData) => {
  return await prisma.playlist.create({
    data: playlistData,
  });
};

const findPlaylistsByUser = async (idUser) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: idUser,
    },
  });

  return playlists;
};

const findPlaylistById = async (id) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      albums: {
        include: {
          artist: true,
        },
      },
    },
  });

  return playlist;
};

const updatePlaylist = async (id, newData) => {
  const updatedPalylist = await prisma.playlist.update({
    where: {
      id: parseInt(id),
    },
    data: newData,
  });

  return updatedPalylist;
};

const deletePlaylist = async (id) => {
  return await prisma.playlist.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const addAlbumToPlaylist = async (idPlaylist, idAlbum) => {
  return await prisma.playlist.update({
    where: {
      id: parseInt(idPlaylist),
    },
    data: {
      albums: {
        connect: {
          id: parseInt(idAlbum),
        },
      },
    },
  });
};

const removeAlbumFromPlaylist = async (idPlaylist, idAlbum) => {
  return await prisma.playlist.update({
    where: {
      id: parseInt(idPlaylist),
    },
    data: {
      albums: {
        disconnect: {
          id: parseInt(idAlbum),
        },
      },
    },
  });
};

const isAlbumInPlaylist = async (playlistId, albumId) => {
  const count = await prisma.playlist.count({
    where: {
      id: parseInt(playlistId),
      albums: {
        some: {
          id: parseInt(albumId),
        },
      },
    },
  });

  return count > 0;
};

module.exports = {
  createPlaylist,
  findPlaylistById,
  findPlaylistsByUser,
  addAlbumToPlaylist,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
  removeAlbumFromPlaylist,
  isAlbumInPlaylist,
};
