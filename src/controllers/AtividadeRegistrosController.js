const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User2 = require('../models/User2');
const TipoAtividade = require('../models/TipoAtividade');
const AtividadePontos = require('../models/AtividadePontos');
const RegistroAtividadesMySql = require("../models/AtividadeRegistroMySql")




router.get('/', authMiddleware, (req, res) => {
    res.send({ ok: true, user: req.userId });
});


router.post('/register', authMiddleware, async (req, res) => {
    const { atividade_id, plano_registro, quantidade_registrado } = req.body;
    try {
        const usuario = await User2.findById(req.userId);

        if (!usuario)
            return res.status(400).json({ error: 'Usuário não existe' });

        const atividade = await TipoAtividade.findById(atividade_id);
        if (!atividade)
            return res.status(400).json({ error: 'atividade não existe' });

         const idusuario = req.userId;
         const idatividade = atividade_id;
         const campus = usuario.campus;
         const plano = Number(plano_registro);
         const departamento = usuario.departamento;
         const quantidade = Number(quantidade_registrado);
         const pontos = Number(atividade.pontuacao);

         RegistroAtividadesMySql.create({
            idusuario: idusuario,
            idatividade: idatividade,
            campus: campus,
            plano: plano,
            departamento: departamento,
            pontos: pontos,
            quantidade: quantidade
        }).then(function(dado){
            return res.status(200).send({inserido: dado, user: usuario, atividade: atividade});
        }).catch(function(erro){
            return res.status(400).send({ error: 'Ocorreu um erro'+ erro });
        });

        
    } catch (e) {
        return res.status(400).send({ error: 'Falha no registro' + e });
    }
});
router.get('/getAll', authMiddleware, async (req, res) => {
    //const atividadePontos = await AtividadePontos.find();
    const atividadePontos = await AtividadePontos.find().populate("atividade").populate("usuario").exec();
   
      return res.json({
            atividadePontos,
        });
    //return res.json(atividadePontos).pop;
});




module.exports = app => app.use('/atividadeRegistro', router);