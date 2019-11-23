const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //verifica se tem token no authorization
    if(!authHeader)
        return res.status(401).send({error: 'Token não informado'});
    
    const parts = authHeader.split(' ');
    //verifica se o token possui 2 partes
    if(!parts.length === 2)
        return res.status(401).send({error: 'Erro de token'});

    const [scheme, token] = parts;
    //regex verificando se comeca com bearer
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'token mal formatado'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'token invalido!'});
        
        req.userId = decoded.id;
        return next();
    })

};