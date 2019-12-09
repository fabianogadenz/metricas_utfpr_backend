const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User2 = require('../models/User2');   
const { sequelize } = require("../database/index");
const db = require("../database/index")

// router.use(authMiddleware);

router.get('/', authMiddleware, (req, res) => {
    res.send({ ok: true, user: req.userId });
});


router.get('/getRankUser/', authMiddleware, async (req, res) => {

    try {
        var usuarios = [];
        var pontos = [];
        const rank = await sequelize.query(`
        SELECT idusuario, sum((pontos*quantidade)) as pontos, campus, quantidade, plano 
        from registroatividades where plano = 2018
        group by idusuario
        order by pontos asc, pontos;`,
            { type: db.sequelize.QueryTypes.SELECT });

        for (i in rank) {
            usuarios.push(await User2.findById(rank[i].idusuario));
            pontos.push(rank[i].pontos);
        }


        return res.status(200).send({ usuarios, pontos });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar dados' });
    }
});


module.exports = app => app.use('/ranking', router);