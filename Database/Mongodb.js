const mongoose = require('mongoose');

const uri = process.env.URI;

mongoose.connect(uri).then(() => {
    console.log("Conexion exitosa con la base de datos");
}).catch((err) => {
    console.log("fallo la conexion," + err);
})
