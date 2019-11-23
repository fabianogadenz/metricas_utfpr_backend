const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    grandeAreaNome: {
        type:String,
        required: true,
        uppercase: true,
    },
    grandeAreaDescricao: {
        type:String,
        required: true,
        uppercase: true,
    },
    subAreaNome: {
        type:String,
        required: true,
    },
    subAreaDescricao: {
        type:String,
        required: true,
    },
    item: {
        type:String,
        unique:true,
        required: true,
    },
    itemDescricao: {
        type:String,
        required: true,
    },
    pontuacao: {
        type:Number,
        required: true,
    },
    pontuacaoMaxima: {
        type:Number,
        default: 0
    },
    codArea: {
        type:Number,
        required: true,
    },
    observacao:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const Area = mongoose.model('Area', AreaSchema);

module.exports = Area;