const router = require('express').Router();
const authRouter = require('./Auth');
const aboutRouter = require('./About');
const postRouter = require('./Post');
const { HomeController } = require('../controllers');

router.get('/', HomeController.index);
router.use('/users', authRouter);
router.use('/about', aboutRouter);
router.use('/post', postRouter);


module.exports = router;