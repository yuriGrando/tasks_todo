const Sequelize = require('sequelize');
const db = require('./db');

const Tasks = db.define('tasks', {

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

    userCreate: {
        type: Sequelize.STRING,
        allowNull: false
    },

    userDo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dateFinish: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dateCreate: {
        type: Sequelize.STRING,
        allowNull: false
    },

    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },

})

//CRIAR TABELA
Tasks.sync(/* {
    alter: true
} */)

module.exports = Tasks;