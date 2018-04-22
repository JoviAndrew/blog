const router = require('express').Router();
const home = require('../controllers/home_controller');

router.get('/show', home.getAllPosts);

router.post('/post', home.addPost);

module.exports = router;