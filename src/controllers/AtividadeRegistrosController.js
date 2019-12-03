const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User2 = require('../models/User2');
const TipoAtividade = require('../models/TipoAtividade');
const AtividadePontos = require('../models/AtividadePontos');
const RegistroAtividadesMySql = require("../models/AtividadeRegistroMySql")
const { sequelize } = require("../database/index");
const db = require("../database/index")




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
        }).then(function (dado) {
            return res.status(200).send({ inserido: dado, user: usuario, atividade: atividade });
        }).catch(function (erro) {
            return res.status(400).send({ error: 'Ocorreu um erro' + erro });
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

router.get('/infoPlanos/',authMiddleware, async (req, res) => {
    const idUser = req.userId;
    //const idUser = req.params._id;
    let rankCampus2018 = '-';
    let rankPlano2018 = '-';
    let rankCampus2019 = '-';
    let rankPlano2019 = '-';
    let rankCampus2020 = '-';
    let rankPlano2020 = '-';
    let pontos2018 = '-';
    let pontos2019, pontos2020 = '-';


    try {
        const usuario = await User2.findById(idUser);

        if (!usuario)
            return res.status(400).json({ error: 'Usuário não existe' });

        const rank = await sequelize.query(`
                select xtab.*
                    , rank() over( partition by xtab.plano , xtab.campus order by xtab.plano , xtab.campus , xtab.pontos desc ) RankingCampusPlano
                    , rank() over( partition by xtab.plano order by xtab.plano , xtab.pontos desc ) RankingPlano
                from (
                    select idusuario
                        , plano
                        , campus
                        , sum( pontos*quantidade ) pontos
                    from registroatividades
                    group by idusuario
                        , plano
                        , campus
                    order by 3 , 2 , 4 desc ) xtab;`,
            { type: db.sequelize.QueryTypes.SELECT });

        for (i in rank) {
            if (idUser == rank[i].idusuario) {
                if (rank[i].plano == 2018){
                    rankCampus2018 = rank[i].RankingCampusPlano;
                    rankPlano2018 = rank[i].RankingPlano;
                    pontos2018 = rank[i].pontos;
                }
                else if (rank[i].plano == 2019){
                    rankCampus2019 = rank[i].RankingCampusPlano;
                    rankPlano2019 = rank[i].RankingPlano;
                    pontos2019 = rank[i].pontos;
                }
                else if (rank[i].plano == 2020){
                    rankCampus2020 = rank[i].RankingCampusPlano;
                    rankPlano2020 = rank[i].RankingPlano;
                    pontos2020 = rank[i].pontos;
                }
            }
        }
        
        return res.status(200).send({ rankCampus2018, rankCampus2019, rankCampus2020, 
        rankPlano2018, rankPlano2019, rankPlano2020, pontos2018, pontos2019, pontos2020 });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar dados' });
    }
});



module.exports = app => app.use('/atividadeRegistro', router);