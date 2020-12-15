const { User, Post, Art } = require('../../models');
const Joi = require('joi');

//? Get All User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'Request succes',
      message: 'Users was fetched',
      data: {
        users,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? User By Id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Post,
          as: 'posts',
        },
        {
          model: Art,
          as: 'arts',
        },
      ],
    });

    if (!user) {
      return res.send({
        status: 'Request failed',
        message: `User on id ${id} not found`,
      });
    }
    res.send({
      status: 'Request succes',
      message: 'User was fetched',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Update
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, file } = req;

    const fileAvatar = file.filename;

    console.log(file.filename);

    const schema = Joi.object({
      fullname: Joi.string().min(2),
      greeting: Joi.string(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    await User.update(
      {
        ...body,
        avatar: fileAvatar,
      },
      {
        where: {
          id,
        },
      }
    );

    const userUpdated = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });
    res.status(200).send({
      status: 'Request succes',
      message: 'Channel was updated',
      data: {
        user: userUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Delete
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });

    //? Where id not exist
    if (!deletedUser) {
      return res.send({
        status: 'Request failed',
        message: `Video with id ${id} not found`,
        data: {
          video: deletedUser,
        },
      });
    }

    //? Response after deleted
    res.send({
      status: 'Request success',
      message: 'Video succesfully deleted',
      data: {
        video: deletedUser,
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
