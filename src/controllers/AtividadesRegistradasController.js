const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const TipoAtividade = require('../models/TipoAtividade');   
const { sequelize } = require("../database/index");
const db = require("../database/index")

// router.use(authMiddleware);

router.get('/', authMiddleware, (req, res) => {
    res.send({ ok: true, user: req.userId });
});


router.get('/getRegistros/', authMiddleware, async (req, res) => {

    try {
        var atividades = [];
        var infos = [];
        const registros = await sequelize.query(`
        select * from registroatividades
        where plano = 2018 and idusuario = "5ddfdb9f9960b43ab8085342";`,
            { type: db.sequelize.QueryTypes.SELECT });


         for (i in registros) {
             console.log(registros[i].idatividade);
            infos.push(await TipoAtividade.findById(registros[i].idatividade));
            atividades.push(registros[i]);
         }


        return res.status(200).send({ infos, atividades });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar dados' });
    }
});


module.exports = app => app.use('/atividadesRegistradas', router);