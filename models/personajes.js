const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;

const PersonajeSchema = Schema(
  {
    nombre: String,
    apellido: String,
    nombreSuperHeroe: String,
    descripcion: String,
    imagen: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PersonajeSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imagen = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("Personajes", PersonajeSchema);
