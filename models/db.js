const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.NAME_DATABASE,
    process.env.USER_DATABASE,
    process.env.PASSWORD_DATABASE,
    {
    host: 'localhost',
    dialect : 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Banco de dados conectado com sucesso!');
}).catch((err)=>{
    console.log('Erro: Conexão com o banco de dados')
})

module.exports = sequelize;