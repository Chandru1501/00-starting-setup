const Sequelize = require('sequelize');
//                            |schema name| |path|  |PW|
const Products = new Sequelize('data-node','root','1501',{
     dialect : 'mysql',
     host : 'localhost'
})

// const Users = new Sequelize('user-data','root','1501',{
//      dialect : 'mysql',
//      host : 'localhost'
// })

module.exports = Products;
// module.exports = Users;