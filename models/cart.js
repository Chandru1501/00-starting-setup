const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
      static addProduct(id,productprice){
        
        fs.readFile(p, (err,content)=>{
            let cart = {products : [] , totalprice:0};

            if(!err) {
                cart = JSON.parse(content);       
            }
            let existingproductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingproduct = cart.products[existingproductIndex]

            let updatedProduct;

            if(existingproduct){
               updatedProduct = {...existingproduct};
               updatedProduct.qty = updatedProduct.qty+1;
               cart.products = [...cart.products];
               cart.products[existingproductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {id : id , qty : 1 , productprice : productprice};
                cart.products  = [...cart.products,updatedProduct];
            }
            cart.totalprice = cart.totalprice + + productprice ;
        fs.writeFile(p,JSON.stringify(cart), (err)=>{
            console.log(err);
        });
        })

      }


     static deleteProductinCart(id,productprice){
          fs.readFile(p,(err,content)=>{
            if(err){
                return;
            }
           let updatedProducts = JSON.parse(content);

           if(updatedProducts.products.length>0){

           console.log(updatedProducts);
           
           let productToDelete = updatedProducts.products.find(prods => prods.id===id);
           let productToDeleteIndex = updatedProducts.products.findIndex(prods => prods.id===id);
           let deletedProductTotalPrice = productprice * productToDelete.qty;
           let updatedTotalprice = updatedProducts.totalprice - deletedProductTotalPrice;
           updatedProducts.products.splice(productToDeleteIndex,1);
           updatedProducts.totalprice = updatedTotalprice;
           console.log(updatedProducts);
           fs.writeFile(p,JSON.stringify(updatedProducts), (err)=>{
            console.log(err);
           })
       }
       else{
         return;
       }
    })
}   
        

      static getallCart(cb){
        fs.readFile(p,(err,content)=>{
            if(err){
                cb(null);
            }
            else{
             cb(JSON.parse(content));
            }
        })
      }
}

