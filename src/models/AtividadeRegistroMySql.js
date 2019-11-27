const db = require("../database/index")

const RegistroAtividadesMySql = db.sequelize.define('REGISTROATIVIDADES', {
    idusuario: {
        type: db.Sequelize.STRING
    },
    idatividade: {
        type: db.Sequelize.STRING
    },
    campus: {
        type: db.Sequelize.STRING
    },
    plano: {
        type: db.Sequelize.INTEGER
    },
    departamento: {
        type: db.Sequelize.STRING
    },
    pontos: {
        type: db.Sequelize.INTEGER
    },
    quantidade: {
        type: db.Sequelize.INTEGER
    },
})
//RegistroAtividadesMySql.sync({force:true})
module.exports = RegistroAtividadesMySql