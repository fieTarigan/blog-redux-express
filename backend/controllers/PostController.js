const { Posting } = require('../models');
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

class PostController {
  static async index(req, res) {
    try {
      const token = req.query.token;
      
      if ( token === null || token === 'false') {
        res.status(401).json({ message: 'You must login first.' });
      }

      const decoded = jwt.verify(token, secretKey);

      const posts = await Posting.findAll({
          where: {'id_user': decoded.id}
      });

      res.status(201).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createPost (req, res) {
    try {
      const { title, content, status, token } = req.body;
      // console.log('server');
      // console.log('reqbody',req.body);

      if ( token === null || token === 'false') {
        res.status(401).json({ message: 'You must login first.' });
      }

      const decoded = jwt.verify(token, secretKey);

      if (title === null || content === null) {
        res.status(400).json({ message: 'All field must be filled in.' });
        return;
      }

      const post = await Posting.create({
        id_user: decoded.id,
        title,
        content,
        status: Number(status)
      });

      res.status(201).json(post);
    } catch (error) {
      // console.log('error:', error);
      res.status(500).json(error);
    }
  }

  static async editStatusPost (req, res) {
    try {
      const postId = +req.params.id;

      const post = await Posting.findByPk(postId);

      console.log('post by id', post);

      const response = await Posting.update({
        status: post.status === 0 ? 1 : 0
      }, {
        where: { id: postId }
      });

      if (response[0] === 1) {
        res.status(201).json({ message: 'Status Updated' });
      } else {
        res.status(404).json({ message: 'Something Wrong' })
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async editCourse(req, res) {
    try {
      const id = +req.params.id;

      const { name, desc, image, price, label } = req.body;
      console.log('masuk server:');
      console.log('body:', req.body);

      const courses = await Course.update({
        name, desc, image, price: Number(price), label
      }, {
        where: { id }
      });

      if (courses[0] === 1) {
        res.status(201).json({ message: 'Course Updated' });
      } else {
        res.status(404).json({ message: 'Something Wrong' })
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteCourse(req, res) {
    try {
      const id = +req.params.id;
      console.log('server, id:', id);

      const courses = await Course.destroy({
        where: { id }
      });

      if (courses === 1) {
        console.log(courses)
        res.status(201).json({ message: 'Course Deleted!' });
      } else {
        res.status(404).json({ message: 'Something Wrong' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = PostController;