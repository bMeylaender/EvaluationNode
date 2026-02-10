const prisma = require("../config/prisma-client");

const findAllArtistes = async () => {
  const artistes = await prisma.artist.findMany();

  return artistes;
};

const findArtisteById = async (id) => {
  const artiste = await prisma.artist.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      albums: true,
    },
  });

  return artiste;
};

const addArtiste = async (artisteData) => {
  return await prisma.artist.create({
    data: artisteData,
  });
};

const updateArtiste = async (id, newData) => {
  return await prisma.artist.update({
    where: {
      id: parseInt(id),
    },
    data: newData,
  });
};

const deleteArtiste = async (id) => {
  return await prisma.artist.delete({
    where: {
      id: parseInt(id),
    },
  });
};

module.exports = {
  findAllArtistes,
  findArtisteById,
  addArtiste,
  updateArtiste,
  deleteArtiste,
};
