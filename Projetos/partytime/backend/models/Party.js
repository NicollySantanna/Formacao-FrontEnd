const mongoose = require("mongoose")

const { Schema } = mongoose

const { serviceSchema } = require("./Service")

const partySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        services: {
            type: [serviceSchema]
        },
    },
    {timestamps: true} //registra a data de criação e última atualização de cada festa.
);

const Party = mongoose.model("Party", partySchema)

module.exports = Party;