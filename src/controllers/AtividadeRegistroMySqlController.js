const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const RegistroAtividadesMySql = require("../models/AtividadeRegistroMySql")
//const {sequelize} = require("../database/index");





router.get('/', authMiddleware,async function(req, res)  {

    RegistroAtividadesMySql.findAll().then(function(registros){
        console.log(registros);
        return res.status(200).send({ registros: registros, user: req.userId 
        });
    })
    console.log(RegistroAtividadesMySql.all());
     res.send({ ok: true, user: req.userId });
});

router.get('/inserir', authMiddleware, (req, res) => {
    const { idusuario, idatividade, plano, quantidade, pontos, departamento, campus } = req.body;

    RegistroAtividadesMySql.create({
        idusuario: idusuario,
        idatividade: idatividade,
        campus: campus,
        plano: plano,
        departamento: departamento,
        pontos: pontos,
        quantidade: quantidade
    }).then(function(dado){
        return res.status(200).send({ ok: true,dado: dado, user: req.userId });
    }).catch(function(erro){
        return res.status(400).send({ error: 'Ocorreu um erro' });
    });
    
});
module.exports = app => app.use('/registroAtividadesMySql', router);