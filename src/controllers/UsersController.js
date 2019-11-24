const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User2 = require('../models/User2');
const router = express.Router();

// router.use(authMiddleware);



// router.post('/register', authMiddleware, async (req, res) => {
//     const { codArea, grandeAreaNome, grandeAreaDescricao, subAreaNome,
//         subAreaDescricao, item, itemDescricao, pontuacao,
//         pontuacaoMaxima, observacao} = req.body;
//     try {
//         if (await Area.findOne({ item }))
//             return res.status(400).send({ error: 'Item já existe!' });
            
//         const area = await Area.create(req.body);
//         return res.send({area});
//     } catch (e) {
//         return res.status(400).send({ error: 'Falha no registro' });
//     }
// });

router.get('/', authMiddleware, async (req, res) => {
        const users = await User2.find();
        return res.json(users);
});

// router.get('/:_id', async (req, res) => {
//     //populate traz os dados do user
//     try{
//         const area = await Area.findById(req.params._id);
//         return res.send({area});
//     }catch(err){
//         return res.status(400).send({error: 'Erro ao carregar dados da area'});
//     }
// });

// router.delete('/:_id', async (req, res) => {
//     try{
//         await Area.findByIdAndRemove(req.params._id);
//         return res.send({removido: true});
//     }catch(err){
//         return res.status(400).send({error: 'Erro ao excluir dados da area'});
//     }
// });


module.exports = app => app.use('/users', router);