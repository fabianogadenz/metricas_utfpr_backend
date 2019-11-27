const express = require('express');
const authMiddleware = require('../middlewares/auth');
const AtividadeRegistro = require('../models/AtividadeRegistro');
const router = express.Router();
const User2 = require('../models/User2');
const TipoAtividade = require('../models/TipoAtividade');
const AtividadePontos = require('../models/AtividadePontos');



router.get('/', authMiddleware, (req, res) => {
    res.send({ ok: true, user: req.userId });
});


router.post('/register', authMiddleware, async (req, res) => {
    const { atividade_id, plano, quantidade } = req.body;
    try {
        const usuario = await User2.findById(req.userId);

        if (!usuario)
            return res.status(400).json({ error: 'Usuário não existe' });

        const atividade = await TipoAtividade.findById(atividade_id);
        if (!atividade)
            return res.status(400).json({ error: 'atividade não existe' });

        const pontos = (quantidade * atividade.pontuacao);
        const atividadePontos = await AtividadePontos.findOne(
            { atividade: atividade, usuario: usuario, plano: plano });
        if (atividadePontos) {
            console.log(" encontrou");
            const pontosAtualizada = atividadePontos.pontos + pontos;
            const quantidadeAtualizada = atividadePontos.quantidade + quantidade;
            const atividadePontosAtualizado = await AtividadePontos.updateOne(
                { _id: atividadePontos._id },
                {
                    quantidade: quantidadeAtualizada,
                    pontos: pontosAtualizada
                })
            console.log(atividadePontosAtualizado);
            return res.send({ ok: true, atividadePontos, pontos: pontosAtualizada, quantidade: quantidadeAtualizada });
        }

        else {
            console.log("nao cencontrou");
            const atividadeComPontos = await AtividadePontos.create({
                atividade: atividade,
                usuario: usuario,
                plano: plano,
                quantidade: quantidade,
                pontos: pontos
            });
            console.log(atividadeComPontos);
            return res.send({
                ok: true,
                atividadeComPontos,
                pontos,
                quantidade
            });
        }
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