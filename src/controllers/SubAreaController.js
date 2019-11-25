const express = require('express');
const authMiddleware = require('../middlewares/auth');
const SubArea = require('../models/SubArea');
const router = express.Router();

// router.use(authMiddleware);

router.get('/', authMiddleware, (req, res)=> {
     res.send({ok: true, user: req.userId});
});


router.post('/register', authMiddleware, async (req, res) => {
    const { subAreaNome } = req.body;
    try {
         if (await SubArea.findOne({ subAreaNome }))
             return res.status(400).send({ error: 'Sub Área já existe!' });
            
        const subArea = await SubArea.create(
            req.body
        );
        return res.send({subArea});
    } catch (e) {
        return res.status(400).send({ error: 'Falha no registro' + e });
    }
});

router.get('/findall', authMiddleware, async (req, res) => {
        const subAreas = await SubArea.find();
        return res.json(subAreas);
});

router.get('/:_id', async (req, res) => {
    try{
        const subArea = await SubArea.findById(req.params._id);
        return res.send({subArea});
    }catch(err){
        return res.status(400).send({error: 'Erro ao carregar dados da SubArea'});
    }
});

router.delete('/:_id', async (req, res) => {
    try{
        await SubArea.findByIdAndRemove(req.params._id);
        return res.send({removido: true});
    }catch(err){
        return res.status(400).send({error: 'Erro ao excluir dados da SubArea'});
    }
});


module.exports = app => app.use('/subArea', router);