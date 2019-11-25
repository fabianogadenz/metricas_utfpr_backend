const mongoose = require('mongoose');

const SubAreaSchema = new mongoose.Schema({
    grandeArea: {
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
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const SubArea = mongoose.model('SubArea', SubAreaSchema);

module.exports = SubArea;