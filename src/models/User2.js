const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required: true,
        lowercase: true,
    },
    nome: {
        type:String,
        required: true,
    },
    siape: {
        type:Number,
        required: true,
    },
    ra: {
        type:Number,
        unique:true,
        required: true,
    },
    departamento: {
        type:String,
        required: true,
    },
    sigla: {
        type:String,
        required: true,
    },
    campus: {
        type:String,
        required: true,
    },
    tipoCadastro: {
        type:String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User2 = mongoose.model('User2', UserSchema);

module.exports = User2;