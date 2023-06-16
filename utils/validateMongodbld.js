const mongoose = require('mongoose');

//Cette fonction a pour but de verifier si tout controller 
//utilisant un id est bien celui de la base de donner
const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new Error("Ce id n'est pas valide ou est introuvable");
};

module.exports = validateMongodbId;