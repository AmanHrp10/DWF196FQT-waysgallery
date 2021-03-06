const { Post, Photos, User } = require('../../models');
const { Op } = require('sequelize');
const Joi = require('joi');

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: {
        exclude: ['userId', 'UserId', 'updatedAt'],
      },
      include: [
        {
          model: Photos,
          as: 'photos',
          attributes: ['id', 'image'],
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });

    res.send({
      status: 'Request succes',
      message: 'post was fetched',
      count: posts.length,
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

//? Get detail post
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['userId', 'updatedAt', 'UserId', 'createdAt'],
      },
      include: [
        {
          model: Photos,
          as: 'photos',
          attributes: ['id', 'image'],
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
    });
    if (!post) {
      res.send({
        status: 'Request success',
        message: `Post id ${id} not exist`,
        data: {
          post,
        },
      });
    }
    res.send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      data: {
        post,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};

//? Add Post
exports.addPost = async (req, res) => {
  try {
    const { id } = req.user;
    const { body, files } = req;

    const filePost = files.photos ? files.photos[0].filename : null;
    const pathPost = files.photos ? files.photos[0].path : null;
    //? Validation
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      photos: Joi.array().required(),
    });

    const { error } = schema.validate(
      { ...body, photos: files.photos },
      {
        abortEarly: false,
      }
    );

    if (error) {
      res.send({
        status: 'Request failed',
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }

    const newPost = await Post.create({
      ...body,
      userId: id,
    });

    if (!newPost) {
      return res.send({
        status: 'Request failed',
        message: 'Failed add post',
      });
    }

    const photo = async () => {
      return Promise.all(
        files.photos.map(async (photo) => {
          try {
            await Photos.create({
              postId: newPost.id,
              image: photo.path,
            });
          } catch (err) {
            console.log(err);
          }
        })
      );
    };

    photo().then(async () => {
      const response = await Post.findOne({
        where: {
          id: newPost.id,
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId', 'UserId'] },
        include: {
          model: Photos,
          as: 'photos',
          attributes: ['id', 'image'],
        },
      });
      res.send({
        status: 'Request success',
        message: 'Video succesfully Added',
        data: {
          post: response,
        },
      });
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Update Post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;

    const detailPost = await Post.findOne({
      where: { id },
      include: {
        model: Photos,
        as: 'photos',
      },
    });

    console.log(detailPost.title);
    if (!detailPost) {
      return res.send({
        status: 'Request failed',
        message: `Post with id ${id} not found`,
        data: {
          post: detailPost,
        },
      });
    }
    const schema = Joi.object({
      title: Joi.string().min(2),
      description: Joi.string().min(10),
      photos: Joi.array(),
    });

    const { error } = schema.validate(
      { ...body, photos: files.photos },
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.send({
        status: 'Request failed',
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }

    await Post.update(
      {
        ...body,
        photos: detailPost.photos,
      },
      { where: { id } }
    );

    const postUpdated = await Post.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Photos,
        as: 'photos',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });

    //? Response Video after updated
    res.send({
      status: 'Request success',
      message: 'Post succesfully updated',
      data: {
        post: postUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const photo = Photos.findAll({
      where: {
        postId: id,
      },
    });

    await Photos.destroy({
      where: {
        id: photo.id,
      },
    });
    const deletedPost = await Post.destroy({
      where: {
        id,
      },
    });

    //? Where id not exist
    if (!deletedPost) {
      return res.send({
        status: 'Request failed',
        message: `Post with id ${id} not found`,
        data: {
          post: deletedPost,
        },
      });
    }

    //? Response after deleted
    res.send({
      status: 'Request success',
      message: 'Post succesfully deleted',
      data: {
        post: deletedPost,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};

//? Search Post
exports.searchPost = async (req, res) => {
  try {
    const { title } = req.body;
    const posts = await Post.findAll({
      where: {
        title: { [Op.like]: `%${title}%` },
      },
      include: {
        model: Photos,
        as: 'photos',
      },
    });

    if (posts.length === 0) {
      return res.send({
        status: 'Request failed',
        message: 'Not post',
      });
    }

    res.send({
      status: 'Request success',
      message: 'Posts was finding',
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? post Today

exports.getPostToday = async (req, res) => {
  const d = new Date();

  // const date = Math.floor(d.setDate(d.getDate()));
  // console.log('Ini');

  console.log(d.getTime());

  try {
    const todayPost = await Post.findAll();

    console.log(todayPost[0].createdAt.getDay());

    res.send({
      post: todayPost,
    });
  } catch (err) {
    console.log(err);
  }
};
