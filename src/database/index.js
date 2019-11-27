const Sequelize = require('sequelize')
const sequelize = new Sequelize('metricasutfpr', 'root', 'fa2f81', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("conectado no mysql")
}).catch(function(erro){
    console.log("nao conectado" + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}