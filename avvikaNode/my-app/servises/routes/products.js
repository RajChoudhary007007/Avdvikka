const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })

const productsController = require('../controllers/productsController')

route.post('/api/products', upload.fields([{ name: 'image_url', maxCount: 2 }]), productsController.productsData)
route.get('/api/products/all', productsController.getAllData)
route.get('/api/products/all/filter', productsController.fillterData)
route.get('/api/products/:id', productsController.getDataById)
route.delete('/api/products/delete/:id', productsController.productDeleteById)
route.put('/api/products/edit/:id', productsController.editProductById)



module.exports = route
