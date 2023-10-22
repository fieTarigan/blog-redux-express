const { Posting } = require('../models');

class HomeController {
  static async index (req, res) {
    try {
      const listPosting = await Posting.findAll({
        where: { status: 1 }
      });

      res.status(200).json(listPosting);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = HomeController;