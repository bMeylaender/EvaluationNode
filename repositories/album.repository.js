const prisma = require("../config/prisma-client");

const findAllAlbums = async () => {
  const albums = await prisma.album.findMany({
    include: {
      artist: true,
    },
  });

  return albums;
};

const findAlbumById = async (id) => {
  const album = await prisma.album.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      artist: true,
    },
  });

  return album;
};

const addAlbum = async (albumData) => {
  return await prisma.album.create({
    data: albumData,
  });
};

const updateAlbum = async (id, newData) => {
  return await prisma.album.update({
    where: {
      id: parseInt(id),
    },
    data: newData,
  });
};

const deleteAlbum = async (id) => {
  return await prisma.album.delete({
    where: {
      id: parseInt(id),
    },
  });
};

module.exports = {
  findAllAlbums,
  findAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
