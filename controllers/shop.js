const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req,res,next) =>{
  const prodId = req.params.productId;
  Product.getbyId(prodId, product => {
    res.render('shop/product-detail',{
      product:product,
      pageTitle : product.title,
      path:"/products"
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {

  Cart.getallCart(carts =>{
    if(carts == null){
      res.redirect('/')
      return
    }
    else{
      Product.fetchAll(products =>{
         let Cartproducts = {Products : [],totalPrice:0};
        for(cart of carts.products){
          let cartProduct = products.find(prods => prods.id===cart.id);
          cartProduct.qty = cart.qty;
          Cartproducts.Products.push(cartProduct);
          let total =  cartProduct.price * cartProduct.qty;
         // console.log(total);
          Cartproducts.totalPrice += total;
        }
     //console.log(Cartproducts);
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products : Cartproducts
          })
      })
    }
    });

  };

  exports.deleteCartItem = (req,res,next) =>{
    const prodId = req.body.productId;
    console.log(prodId);
    Cart.deleteProductinCart(prodId);
    res.redirect('/cart');
  }



exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  //console.log(prodId)
  let productprice;
  Product.getbyId(prodId,product => {
    productprice = product.price;
    //console.log(productprice)
    Cart.addProduct(prodId,productprice)
  })
  res.redirect('/cart');
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

