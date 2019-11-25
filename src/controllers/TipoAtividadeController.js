const express = require('express');
const authMiddleware = require('../middlewares/auth');
const TipoAtividade = require('../models/TipoAtividade');
const SubArea = require('../models/SubArea');
const router = express.Router();

// router.use(authMiddleware);

router.get('/', authMiddleware, (req, res)=> {
     res.send({ok: true, user: req.userId});
});


router.post('/register', authMiddleware, async (req, res) => {
    const{ subAreaId, idReferencia, pontuacao, pontuacaoMaxima,
        descricao, observacao } = req.body;

        
        const subArea = await SubArea.findById(subAreaId);
        console.log(subArea);
    try {
         if (await TipoAtividade.findOne({ idReferencia }))
             return res.status(400).send({ error: 'TipoAtividade já existe!' });
            
        const tipoAtividade = await TipoAtividade.create({
            subArea: subArea,
            idReferencia:idReferencia,
            pontuacao:pontuacao,
            pontuacaoMaxima:pontuacaoMaxima,
            descricao:descricao,
            observacao:observacao
        }
        );
        return res.send({tipoAtividade});
    } catch (e) {
        return res.status(400).send({ error: 'Falha no registro' + e });
    }
});

router.get('/findall', authMiddleware, async (req, res) => {
        const tipoAtividades = await TipoAtividade.find();
       // tipoAtividades.populate('subArea').execPopulate()
        return res.json(tipoAtividades);
});

router.get('/:_id', async (req, res) => {
    try{
        const tipoAtividade = await TipoAtividade.findById(req.params._id);
        return res.send({tipoAtividade});
    }catch(err){
        return res.status(400).send({error: 'Erro ao carregar dados da TipoAtividade'});
    }
});

router.delete('/:_id', async (req, res) => {
    try{
        await TipoAtividade.findByIdAndRemove(req.params._id);
        return res.send({removido: true});
    }catch(err){
        return res.status(400).send({error: 'Erro ao excluir dados da TipoAtividade'});
    }
});


module.exports = app => app.use('/tipoAtividade', router);