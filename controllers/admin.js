const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageurl = req.body.imageurl;
  const price = req.body.price;
  const description = req.body.description;
   
  req.user.createProduct({
    title : title,
    price : price,
    imageurl : imageurl,
    description : description
  })
  .then((result)=>{
    //console.log(result);
    res.redirect('/');
  })
  .catch(err=> console.log(err));

};

exports.getEditProduct = (req, res, next) => {
   editMode = req.query.edit;
   if(!editMode){
     res.redirect('/');
   }
   const prodId = req.params.productId;

   req.user.getProducts({where : {id:prodId}})
   .then((Products)=>{
    const product = Products[0];
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product : product
      });
  })
    .catch((err)=>{
        console.log(err);
   })
};

exports.postEditProduct = (req,res,next) =>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageurl = req.body.imageurl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  
  Product.findOne({where : {id : prodId}})
  .then((product) => {
    product.title = updatedTitle,
    product.price = updatedPrice,
    product.imageurl = updatedImageurl,
    product.description = updatedDescription
     return product.save();
  })
  .then((result) =>{
    res.redirect('/')
    //console.log(result)
    console.log('UPDATED')
  })
  .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
  .then((products)=>{  
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      id: products.id
     })
})
  .catch((err)=>{
     console.log(err);
  })
};

exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findOne({where : {id:prodId}})
  .then((product)=>{
    product.destroy();
    res.redirect('/');
  })
  .catch(err=> console.log(err))
}

