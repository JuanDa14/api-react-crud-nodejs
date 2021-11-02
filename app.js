const express = require("express");
const cors = require("cors");
const personajeRouter = require("./routes/personajes");
const whiteList = ["http://localhost:3000"];
const app = express();
app.use(cors({ origin: whiteList }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(`${__dirname}/uploads`));

app.use("/v1", personajeRouter);

module.exports = app;
