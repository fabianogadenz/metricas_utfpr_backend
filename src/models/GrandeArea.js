const mongoose = require('mongoose');

const GrandeAreaSchema = new mongoose.Schema({
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
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const GrandeArea = mongoose.model('GrandeArea', GrandeAreaSchema);

module.exports = GrandeArea;