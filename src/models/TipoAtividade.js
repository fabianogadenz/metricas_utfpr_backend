const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TipoAtividadeSchema = new mongoose.Schema({
    subArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubArea'
    },
    idReferencia: {
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
    descricao: {
        type:String,
        required: true,
    },
    observacao: {
        type:String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const TipoAtividade = mongoose.model('TipoAtividade', TipoAtividadeSchema);

module.exports = TipoAtividade;