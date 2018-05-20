const router = require('express').Router();
const home = require('../controllers/home_controller')
const uploadFile = require('../middleware/upload')

router.get('/show', home.getAllPosts);

router.post('/post', 
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS, 
            home.addPost);

router.put('/update/:id', 
            uploadFile.multer.single('img'), 
            uploadFile.sendUploadToGCS,
            home.updatePost);

router.delete('/delete/:id', home.deletePost);

router.get('/show/:id', home.findArticleByAuthor)

module.exports = router;