const artisteRepository = require("../repositories/artiste.repository");

const fetchAllArtistes = async () => {
  const artistes = await artisteRepository.findAllArtistes();

  if (artistes.length <= 0) {
    throw {
      status: 404,
      message: "Aucun artiste trouvé",
    };
  }

  return artistes;
};

const fetchArtisteById = async (id) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  const artiste = await artisteRepository.findArtisteById(id);

  if (!artiste) {
    throw {
      status: 404,
      message: "Artiste Introuvable",
    };
  }

  return artiste;
};

const addArtiste = async (artisteData) => {
  const newArtiste = await artisteRepository.addArtiste(artisteData);

  return {
    status: 201,
    message: "Artiste ajouté avec succès",
    data: newArtiste,
  };
};

const updateArtiste = async (id, newData) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  await fetchArtisteById(id);

  const updatedArtiste = await artisteRepository.updateArtiste(id, newData);

  return {
    status: 200,
    message: "Artiste mis à jour avec succès",
    data: updatedArtiste,
  };
};

const deleteArtiste = async (id) => {
  if (!id) {
    throw {
      status: 400,
      message: "Id requis",
    };
  }

  await fetchArtisteById(id);

  await artisteRepository.deleteArtiste(id);

  return {
    status: 204,
    message: "Artiste supprimé avec succès",
  };
};

module.exports = {
  fetchAllArtistes,
  fetchArtisteById,
  addArtiste,
  updateArtiste,
  deleteArtiste,
};
