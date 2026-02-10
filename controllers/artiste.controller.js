const artisteService = require("../services/artiste.service");

const fetchAllArtistes = async (req, res, next) => {
  try {
    const artistes = await artisteService.fetchAllArtistes();

    res.status(200).json(artistes);
  } catch (error) {
    next(error);
  }
};

const fetchArtisteByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const artiste = await artisteService.fetchArtisteById(parseInt(id));

    res.status(200).json(artiste);
  } catch (error) {
    next(error);
  }
};

const addArtiste = async (req, res, next) => {
  try {
    const artisteData = req.body;

    const result = await artisteService.addArtiste(artisteData);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const updateArtiste = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const result = await artisteService.updateArtiste(id, newData);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteArtiste = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await artisteService.deleteArtiste(id);

    res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAllArtistes,
  fetchArtisteByID,
  addArtiste,
  updateArtiste,
  deleteArtiste,
};
