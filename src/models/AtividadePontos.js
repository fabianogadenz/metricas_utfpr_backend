const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AtividadePontosSchema = new mongoose.Schema({
    atividade:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoAtividade'
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User2'
    },
    plano:{
        type: String,
        required: true
    },
    quantidade:{
        type: Number,
        required: true,
    },
    pontos:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const atividadePontos = mongoose.model('AtividadePontos', AtividadePontosSchema);

module.exports = atividadePontos;