const { User, Pendidikan, Pekerjaan, Organisasi } = require('../models');
// const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

class AboutController {
  static async index (req, res) {
    try {
      const token = req.query.token;
      
      if ( token === null || token === 'false') {
        res.status(401).json({ message: 'You must login first.' });
      }

      const decoded = jwt.verify(token, secretKey);

      const user = await User.findByPk(decoded.id, {
        attributes: {
          exclude: ['password']
        },
        include: [Pendidikan, Pekerjaan, Organisasi]
      });

      res.status(200).json(user);

    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = AboutController;