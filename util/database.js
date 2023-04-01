const Sequelize = require('sequelize');
//                            |schema name| |path|  |PW|
const sequelize = new Sequelize('data-node','root','1501',{
     dialect : 'mysql',
     host : 'localhost'
})

module.exports = sequelize;