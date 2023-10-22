const postRouter = require('express').Router();
const { PostController } = require('../controllers');

postRouter.get('/', PostController.index);
postRouter.post('/create', PostController.createPost);
postRouter.put('/updateStatus/:id', PostController.editStatusPost);
postRouter.put('/update/:id', PostController.editCourse);
postRouter.get('/delete/:id', PostController.deleteCourse);

module.exports = postRouter;