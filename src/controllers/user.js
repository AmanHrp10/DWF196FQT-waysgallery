const { User, Post, Art, Photos, Follow } = require('../../models');
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

//? Get User Login
exports.getMyProfile = async (req, res) => {
  try {
    const { id } = req.user;

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
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'UserId'],
          },
          include: {
            model: Photos,
            as: 'photos',
            attributes: ['id', 'image'],
          },
        },
        {
          model: Art,
          as: 'arts',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'following',
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          include: {
            model: Post,
            as: 'posts',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'userId', 'UserId'],
            },
            include: {
              model: Photos,
              as: 'photos',
            },
          },
        },
        {
          model: User,
          as: 'followers',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.send({
      status: 'Request success',
      message: 'Profile was fetched',
      data: {
        user,
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
          include: {
            model: Photos,
            as: 'photos',
          },
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

    console.log(files);
    const user = await User.findOne({
      where: {
        id,
      },
    });

    const fileAvatar = files.avatar ? files.avatar[0] : JSON.parse(user.avatar);

    const schema = Joi.object({
      fullname: Joi.string().min(2),
      greeting: Joi.string(),
    });

    const { error } = schema.validate(
      { ...body },
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    const avatarUpload = {
      path: fileAvatar.path,
      filename: fileAvatar.filename,
    };

    await User.update(
      {
        ...body,
        avatar: JSON.stringify(avatarUpload),
      },
      {
        where: {
          id,
        },
      }
    );

    const afterUpdate = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    if (!afterUpdate) {
      return res.send({
        status: 'Request failed',
        message: 'User update failed',
      });
    }

    res.send({
      status: 'Request success',
      message: 'Your profile was updated',
      data: {
        user: afterUpdate,
      },
    });
  } catch (err) {
    // console.log(err);
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Delete
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedUser = await User.destroy({
//       where: {
//         id,
//       },
//     });

//     //? Where id not exist
//     if (!deletedUser) {
//       return res.send({
//         status: 'Request failed',
//         message: `Video with id ${id} not found`,
//         data: {
//           video: deletedUser,
//         },
//       });
//     }

//     //? Response after deleted
//     res.send({
//       status: 'Request success',
//       message: 'Video succesfully deleted',
//       data: {
//         video: deletedUser,
//       },
//     });
//   } catch (err) {
//     res.send({
//       status: 'Request failed',
//       message: {
//         error: 'Server error',
//       },
//     });
//   }
// };

exports.deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    if (userId !== id) {
      return res.send({
        status: 'Request failed',
        message: 'Invalid user',
      });
    }

    const userById = await User.findOne({
      where: {
        id,
      },
    });

    if (!userById) {
      return res.send({
        status: 'Request failed',
        message: 'User not found',
      });
    }

    await Follow.destroy({
      where: {
        followingId: id,
      },
    });

    await Follow.destroy({
      where: {
        followerId: id,
      },
    });

    await Post.destroy({
      where: {
        userId: id,
      },
    });

    const deleteUser = await User.destroy({ where: { id } });

    res.send({
      status: 'Request succes',
      message: 'Channel was deleted',
      data: {
        channel: deletedUser,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
