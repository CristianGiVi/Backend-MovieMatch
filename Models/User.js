// Importación de mongoose para definir el esquema
const mongoose = require('mongoose');

// Definición del esquema User en la base de datos MongoDB
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    }
});

// Exportación del modelo User para su uso en otras partes de la aplicación
module.exports = mongoose.model('User', UserSchema);
