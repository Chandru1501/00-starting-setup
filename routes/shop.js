const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.use('/product/:productId',shopController.getProduct);

router.get('/products', shopController.getProducts);

router.post('/cart',shopController.postCart);

router.get('/cart', shopController.getCart);

router.post('/delete-cart',shopController.deleteCartItem)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
