
exports.get= (request, response) => {
    response.status(201).json({ mensaje: "hola" });
}