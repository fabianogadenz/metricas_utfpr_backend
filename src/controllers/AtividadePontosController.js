const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AtividadePontos = require('../models/AtividadePontos');
const router = express.Router();


router.get('/', authMiddleware, (req, res)=> {
     res.send({ok: true, user: req.userId});
});


router.get('/findall', authMiddleware, async (req, res) => {
        //const atividadePontos = await AtividadePontos.find();
        const atividadePontos = await AtividadePontos.find().populate("atividade").populate("usuario").exec();
        var valor = 0;
        for(var i = 0; i < atividadePontos.length;i++)
          valor+= Number(atividadePontos[i].pontos);
          return res.json({
                atividadePontos,
                valor
            });
        //return res.json(atividadePontos).pop;
});




module.exports = app => app.use('/atividadePontos', router);