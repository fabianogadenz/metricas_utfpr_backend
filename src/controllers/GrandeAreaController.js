const express = require('express');
const authMiddleware = require('../middlewares/auth');
const GrandeArea = require('../models/GrandeArea');
const router = express.Router();

// router.use(authMiddleware);

router.get('/', authMiddleware, (req, res)=> {
     res.send({ok: true, user: req.userId});
});


router.post('/register', authMiddleware, async (req, res) => {
    const { grandeAreaNome } = req.body;
    try {
         if (await GrandeArea.findOne({ grandeAreaNome }))
             return res.status(400).send({ error: 'Grande Área já existe!' });
            
        const grandeArea = await GrandeArea.create(
            req.body
        );
        return res.send({grandeArea});
    } catch (e) {
        return res.status(400).send({ error: 'Falha no registro' + e });
    }
});

router.get('/findall', authMiddleware, async (req, res) => {
        const grandeAreas = await GrandeArea.find();
        return res.json(grandeAreas);
});

router.get('/:_id', async (req, res) => {
    try{
        const grandeArea = await GrandeArea.findById(req.params._id);
        return res.send({grandeArea});
    }catch(err){
        return res.status(400).send({error: 'Erro ao carregar dados da area'});
    }
});

router.delete('/:_id', async (req, res) => {
    try{
        await GrandeArea.findByIdAndRemove(req.params._id);
        return res.send({removido: true});
    }catch(err){
        return res.status(400).send({error: 'Erro ao excluir dados da area'});
    }
});


module.exports = app => app.use('/grandeArea', router);