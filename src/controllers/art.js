const { Art, User } = require('../../models');
const Joi = require('joi');

exports.addArt = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { files } = req;

    let images = [];

    files.arts.map((file) => {
      images.push({
        userId,
        artImage: file.filename,
      });
    });
    const arts = await Art.bulkCreate(images);

    res.send({
      status: 'Request success',
      message: 'Arts was add',
      data: {
        arts,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
