const express = require("express");
const upload = require("../libs/storage");
const controller = require("../controllers/personajes");
const api = express.Router();

api.get("/personajes", controller.getData);
api.get("/personajes/:id", controller.getDataOne);
api.post("/personajes", upload.single("imagen"), controller.inserData);
api.put("/personajes/:id", upload.single("imagen"), controller.updateOne);
api.delete("/personajes/:id", controller.delete);
module.exports = api;
