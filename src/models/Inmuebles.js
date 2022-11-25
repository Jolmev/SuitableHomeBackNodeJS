const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let inmuebleSchema = new Schema({
    Departamento: { type: String },
    Ciudad: { type: String },
    Direccion: { type: String },
    Habitaciones: { type: Number },
    Banos: { type: Number },
    Area: { type: Number },
    Condicion: { type: String },
    Precio: { type: String },
    Tipo: { type: String }
});

module.exports = mongoose.model("departamentos", inmuebleSchema);