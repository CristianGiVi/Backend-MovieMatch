// Importación de mongoose para definir el esquema
const mongoose = require('mongoose');

// Definición del esquema Review en la base de datos MongoDB
const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 0.0,
        max: 10.0
    },
    comment: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    }
});

// Exportación del modelo Review para su uso en otras partes de la aplicación
module.exports = mongoose.model('Review', ReviewSchema);
