// Importación de mongoose para definir el esquema
const mongoose = require('mongoose');

// Definición del esquema Movie en la base de datos MongoDB
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        trim:true
    },
    yearRelease: {
        type: Number,
        required: true
    },
    censorBoardRating: {
        type: String,
        maxlength: 5,
        trim:true
    },
    plot: {
        type: String
    },
    length: {
        type: Number,
        required: true
    },
    genres: {
        type: [String],
        maxlength: 100
    },
    actors: {
        type: [String],
        required: true
    }
});

// Exportación del modelo Movie para su uso en otras partes de la aplicación
module.exports = mongoose.model('Movie', MovieSchema);
