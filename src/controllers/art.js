const { Art, User } = require('../../models');
const Joi = require('joi');

exports.addArt = async (req, res) => {
  try {
    const { id: userId } = req.userId;
    const { body } = req;

    //? Validation
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().integer().required(),
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

    const user = User.findOne({
      where: {
        id: body.orderTo,
      },
    });

    console.log(user);

    const newArt = await Art.create({
      ...body,
      started: new Date(),
      finished: new Date(),
      orderBy: 6,
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
