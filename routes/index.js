const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const { route } = require('./users');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));
router.use('/likes', require('./likes'));

console.log('Router is loaded');



module.exports = router;