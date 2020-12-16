const { Art, User } = require('../../models');
const Joi = require('joi');

exports.addArt = async (req, res) => {
  try {
    const { userId } = req.user;
    const { body } = req;

    console.log(userId);

    //? Validation
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().integer().required(),
      orderTo: Joi.number(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.send({
        status: 'Request failed',
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }

    const newArt = await Art.create({
      ...body,
      started: new Date(),
      finished: new Date(),
      orderBy: userId,
    });

    const newArtAdd = await Art.findOne({
      where: {
        id: newArt.id,
      },
    });
    res.send({
      status: 'Request success',
      message: 'Video succesfully Added',
      data: {
        post: newArtAdd,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
