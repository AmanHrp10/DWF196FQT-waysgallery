const { User, Post, Art } = require('../../models');
const Joi = require('joi');

//? Get All User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: {
        model: Art,
        as: 'arts',
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
    const { id } = req.user;
    const { body, files } = req;

    const fileAvatar = files.avatar[0].filename;
    console.log(fileAvatar);

    const schema = Joi.object({
      fullname: Joi.string().min(2),
      greeting: Joi.string(),
      arts: Joi.array(),
    });

    const { error } = schema.validate(
      { ...body, arts: files.arts },
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.status(400).send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    const userUpdate = await User.update(
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

    if (!userUpdate) {
      return res.send({
        status: 'Request failed',
        message: 'User update failed',
      });
    }

    const art = async () => {
      return Promise.all(
        files.arts.map(async (art) => {
          try {
            await Art.create({
              userId: id,
              artImage: art.filename,
            });
          } catch (err) {
            console.log(err);
          }
        })
      );
    };

    art().then(async () => {
      try {
        const response = await User.findOne({
          where: {
            id,
          },
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
          include: {
            model: Art,
            as: 'arts',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'userId'],
            },
          },
        });
        res.send({
          status: 'Request succes',
          message: 'User was updated',
          data: {
            user: response,
          },
        });
      } catch (err) {
        res.send({
          status: 'Request failed',
          message: err.message,
        });
      }
    });
  } catch (err) {
    // console.log(err);
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
