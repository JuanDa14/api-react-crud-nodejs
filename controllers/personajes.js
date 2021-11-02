const model = require("../models/personajes");
const mongoose = require("mongoose");
const upload = require("../libs/storage");
const { appConfig } = require("../config");

exports.getData = async (req, res) => {
  try {
    const personajes = await model.find().lean().exec();
    res.status(200).send(personajes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.inserData = async (req, res) => {
  try {
    const { nombre, apellido, nombreSuperHeroe, descripcion } = req.body;
    const personaje = model({
      nombre,
      apellido,
      nombreSuperHeroe,
      descripcion,
    });

    const { filename } = req.file;
    if (req.file) {
      personaje.setImgUrl(filename);
    }
    const PersonajeStore = await personaje.save();
    res.status(201).send(PersonajeStore);
  } catch (error) {
    res.status(500).send({ mesage: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const personaje = await model
      .findOneAndDelete({
        _id: mongoose.Types.ObjectId(id),
      })
      .lean()
      .exec();

    res.status(200).send(personaje);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDataOne = async (req, res) => {
  try {
    const { id } = req.params;
    const personaje = await model
      .findOne({ _id: mongoose.Types.ObjectId(id) })
      .lean()
      .exec();
    res.status(200).send(personaje);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { nombre, apellido, nombreSuperHeroe, descripcion } = req.body;
    const { id } = req.params;
    const { filename } = req.file;
    const { host, port } = appConfig;
    const personaje = await model.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          nombre,
          apellido,
          nombreSuperHeroe,
          descripcion,
          imagen: `${host}:${port}/public/${filename}`,
        },
      }
    );
    if (req.file) {
      personaje.setImgUrl(filename);
    }
    res.status(200).send(personaje);
  } catch (error) {
    res.status(500).send(error);
  }
};
