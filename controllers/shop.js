const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{  
    console.log(products);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch((err)=> {
     console.log(err);
  })
};

exports.getProduct = (req,res,next) =>{
  const prodId = req.params.productId;
  Product.findAll({where : {id : prodId }})
  .then((Product)=>{
    console.log(Product)
    console.log('..........................................................................................')
    console.log(Product[0])
    res.render('shop/product-detail',{
      pageTitle : Product[0].title,
      product:Product[0],
      path:"/products"
      })
    })
  .catch(err => console.log(err))
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products) => { 
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch((err)=>{{
    console.log(err);
  }})

};

exports.getCart = (req, res, next) => {

  req.user.getCart()
  .then((cart)=>{
    // console.log(cart);
     cart.getProducts()
    .then((products)=>{
      //console.log("hellooo  ",products);
          res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products : products
          })
    })
    .catch((err) => console.log(err) );
  })
  .catch((err)=> console.log(err));
  };

  
  
  exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    let FetchedCart;
    req.user.getCart()
    .then((cart)=>{
      FetchedCart =cart;
      return cart.getProducts({where : {id:prodId}})
    })
    .then((products)=>{
      let product;
      if(products.length>0){
        product = products[0];
      }
      let newQty=1;

      if(product){
        //increase qty
        let oldQuantity = product.cartItem.quantity;
        newQty+=oldQuantity;
      }

      Product.findOne({where : {id:prodId}})
      .then((product)=>{
        //console.log(products);
        return FetchedCart.addProduct(product,{
           through : { quantity : newQty }
           })
      })
      .then((product)=>{
        res.redirect('/cart');
      })
      .catch(err => console.log(err))
    })
    .catch(err=> console.log(err));
    
  }
  
  exports.deleteCartItem = (req,res,next) =>{
    const prodId = req.body.productId;
    console.log(prodId);
    CartItem.findOne({where : {productId:prodId}})
    .then((cart)=>{
      cart.destroy();
      res.redirect('/cart');
    })
    .catch(err=>console.log(err));
  }

  exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

