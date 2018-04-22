const router = require('express').Router();
const index = require('../controllers/index_controller');

router.post('/login', index.doLogin);

router.post('/register', index.doRegister);

module.exports = router;