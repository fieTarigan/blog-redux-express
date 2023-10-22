const express = require('express');
const authRouter = express.Router();
const { AuthController } = require('../controllers');

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.registerInput);
authRouter.get('/getid', AuthController.getId);

module.exports = authRouter;