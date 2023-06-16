const mongoose = require('mongoose');

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new Error("Ce id n'est pas valide ou est introuvable");
};

module.exports = validateMongodbId;