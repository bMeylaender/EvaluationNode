const express = require("express");
const authRouter = require("./routes/auth-router");
const errorMiddleware = require("./middlewares/errorMiddleware");
const artistsRouter = require("./routes/artiste-router");
const albumsRouter = require("./routes/album-route");
const playlistsRouter = require("./routes/playlist-route");
const path = require("path");

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRouter);
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/playlists", playlistsRouter);

app.use(errorMiddleware);

app.listen(4000, () => {
  console.log(`Server Start : http://localhost:4000`);
});
