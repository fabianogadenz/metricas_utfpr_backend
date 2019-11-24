const mongoose = require('mongoose');

const SubAreaSchema = new mongoose.Schema({
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
    codArea: {
        type:Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


const SubAreaSchema = mongoose.model('SubArea', SubAreaSchema);

module.exports = SubAreaSchema;