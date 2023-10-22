const aboutRouter = require('express').Router();
const { AboutController } = require('../controllers');

aboutRouter.get('/', AboutController.index);

module.exports = aboutRouter;