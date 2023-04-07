const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const Products = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
 User.findOne({where : {id:1}})
 .then((user)=>{
  req.user = user;
  next();
 })
 .catch((err)=> console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Products.belongsTo(User,{constraints : true , onDelete : 'CASCADE'});
User.hasMany(Products);
User.hasOne(Cart);
Cart.belongsTo(User);  // this is inverse (vice-versa) of User.haseOne(Cart)
Cart.belongsToMany(Products, { through : CartItem });
Products.belongsToMany(Cart, { through : CartItem })


sequelize
// .sync({force : true})
.sync()
.then((result)=>{
  return User.findOne({where : {id:1}})
  // console.log(result);
})
.then((user)=>{
  if(!user){
   return User.create({name : 'chandru' , email : 'chandru001dpm@gmail.com'});
  }
  return user;
})
.then((user)=>{
 Cart.findOne({where : {id:1}})
 .then(cart=>{
   if(!cart){
    return user.createCart();
   }
   return cart;
 })
})
.then(cart=>{
  app.listen(3000);
})
.catch(err => console.log(err));
