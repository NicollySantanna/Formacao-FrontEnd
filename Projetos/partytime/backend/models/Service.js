const mongoose = require("mongoose")

const { Schema } = mongoose

//Desenhando o esqueleto
const serviceSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, 
{ timestamps: true } //Salva a data do registro e atualizacao
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = {
    Service,
    serviceSchema,
}