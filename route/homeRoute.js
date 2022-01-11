const express = require('express')
const homeController = require('../server/controllers/HomeController')
const upload  = require('../server/helper/multer')
const router = express.Router()


// routing starts
router.get('/',homeController.index);
router.get('/share',homeController.share)
router.post('/share',upload.single('image'),homeController.addImage)
// router.get('/files/:id/image',homeController.downloadpage)




//exporting the route module
module.exports = router