const Sequelize = require('sequelize');
const db = require('./db');

const Accounts = db.define('accounts', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    userCreate: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dueDate: {
        type: Sequelize.STRING,
        allowNull: false
    },

    paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },

    type: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

//CRIAR TABELA
Accounts.sync({
    alter: true
})

module.exports = Accounts;