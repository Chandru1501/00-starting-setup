const fs = require('fs');
const path = require('path');
const Cart = require('../models/cart');


const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);


const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        let updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
  
      } 
      else {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getbyId(id,cb){
    getProductsFromFile (products =>{
      const product = products.find(prod => prod.id === id);
      cb(product);
    })
  }

  static deletebyId (id) {
   getProductsFromFile(products => {
    const productIndexTodelete = products.findIndex(prods => prods.id === id);
    const productTodelete = products.find(prods => prods.id === id);
    let updatedproducts = [...products];
    updatedproducts.splice(productIndexTodelete,1);
    fs.writeFile(p,JSON.stringify(updatedproducts), err=>{
      console.log(err);
    })
    Cart.getallCart(CartProds =>{
  let length = CartProds.products.length;
      if(length>0){
      Cart.deleteProductinCart(id,productTodelete.price);
       }
     })
   })
  }
};



