const { Post, Photos } = require('../../models');
const Joi = require('joi');

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: {
        exclude: ['userId', 'UserId', 'createdAt', 'updatedAt'],
      },
      include: {
        model: Photos,
        as: 'photos',
        attributes: ['id', 'image'],
      },
    });

    res.send({
      status: 'Request succes',
      message: 'post was fetched',
      data: {
        posts,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { body } = req;

    //? Validation
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
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

    const newPost = await Post.create({
      ...body,
      userId,
    });

    const postAfterAdd = await Post.findOne({
      where: {
        id: newPost.id,
      },
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: {
        model: Photos,
        as: 'photos',
      },
    });
    res.send({
      status: 'Request success',
      message: 'Video succesfully Added',
      data: {
        post: postAfterAdd,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
