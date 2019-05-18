const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

//Controllers
const ProductController = require('./controllers/ProductController');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

//Products Routes
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

//Box Routes
routes.post('/boxes', BoxController.store);
routes.get('/boxes', BoxController.index);
routes.get('/boxes/:id', BoxController.show);

//File Routes
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;