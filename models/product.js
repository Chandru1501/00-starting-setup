
const Cart = require('../models/cart');
const database = require('../util/database');

const getProductsFromFile = cb => {

};

module.exports = class Product {
  constructor(id,title, imageurl, description, price) {
    this.id = id;
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id===null){
  return database.execute(
  'INSERT INTO products (title,price,description,imageurl) VALUES (?,?,?,?)',[this.title,Number(this.price),this.description,this.imageurl])
  }
  else{
    return database.query(
     'UPDATE products SET title=?, price=?, description=?, imageurl=? WHERE products.id=?',[this.title,Number(this.price),this.description,this.imageurl,Number(this.id)]  
    )
  }
}
  static fetchAll() {
    return database.execute('SELECT * FROM products');
  }

  static getbyId(id){
    return database.execute('SELECT * FROM products WHERE products.id=?',[id]);
  }

  static deletebyId (id) {
   return database.execute('DELETE FROM products WHERE products.id=?',[id])
  }
};



