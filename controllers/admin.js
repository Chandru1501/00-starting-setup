const Product = require('../models/product');

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
  const imageUrl = req.body.imageurl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  
  product.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch(()=>{
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
   editMode = req.query.edit;
   if(!editMode){
     res.redirect('/');
   }
   const prodId = req.params.productId;

   Product.getbyId(prodId)
   .then(([Products])=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product : Products[0]
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
  const updatedProduct = new Product(prodId,updatedTitle,updatedImageurl,updatedDescription,updatedPrice);
  updatedProduct.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch((err)=>{
       console.log(err);
  })
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldContent])=>{
    
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      id: rows.id
     })
})
  .catch((err)=>{
     console.log(err);
  })
};

exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.deletebyId(prodId)
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=> console.log(err))
}

