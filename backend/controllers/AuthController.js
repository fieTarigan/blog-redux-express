require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY;

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (user) {
        const hashPassword = await bcrypt.compare(password, user.password);

        if (hashPassword) {

          if (!secretKey) {
            return res.status(500).json({ message: 'Internal server error: Secret key is missing.' });
          }

          const token = jwt.sign(
            {
              id: user.id,
              username: user.username
            },
            secretKey
          );

          res.status(200).json({
            message: 'Login successful',
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid password' });
        }
      } else {
        res.status(401).json({ message: 'Email not found' });
      }
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'An internal server error occurred.' });
    }
  }
  
  static async registerInput (req, res) {
    try {
      // console.log('request body:', req.body);
      const { username, foto, alamat, password } = req.body;

      let user = await User.create({
        username, foto, alamat, password
      });

      res.status(201).json(user.toJSON());
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static getId (req, res) {
    try {
      const token = req.query.token;
      
      if ( token === null || token === 'false') {
        res.status(401).json({ message: 'You must login first.' });
      }

      const decoded = jwt.verify(token, secretKey);

      res.status(200).json(decoded);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = AuthController;