const express = require('express')
const homeController = require('../server/controllers/HomeController')
const router = express.Router()


// routing starts
router.get('/:id/image',homeController.downloadpage);
router.get('/download/:uid',homeController.downloadImage)




//exporting the route module
module.exports = router