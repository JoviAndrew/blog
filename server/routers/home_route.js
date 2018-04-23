const router = require('express').Router();
const home = require('../controllers/home_controller');

router.get('/show', home.getAllPosts);

router.post('/post', home.addPost);

router.put('/update/:id', home.updatePost);

router.delete('/delete/:id', home.deletePost);

module.exports = router;