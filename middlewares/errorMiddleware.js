const errorMiddleware = (err, req, res, next) => {
  console.error("=== ERREUR NON GÉRÉE ===");
  console.error(err);

  if (err.status) {
    return res.status(err.status).json(err);
  }

  if (err.name && err.name.startsWith("Prisma")) {
    return res.status(500).json(err);
  }

  return res.status(500).json({
    message: "Erreur interne au serveur",
  });
};

module.exports = errorMiddleware;
