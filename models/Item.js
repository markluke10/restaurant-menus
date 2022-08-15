const {db} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Item = db.define('item', {
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.REAL
    },
    vegetarian: {
        type: DataTypes.BOOLEAN
        } 
})



module.exports = {Item}