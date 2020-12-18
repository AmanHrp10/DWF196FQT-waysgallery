const { User, Post } = require('../../models');

exports.checkAuth = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: {
        model: Post,
        as: 'posts',
        attributes: {
          exclude: ['userId', 'UserId', 'updatedAt', 'createdAt'],
        },
      },
    });
    res.send({
      status: 'Request succes',
      message: 'User Valid',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'User not valid',
    });
  }
};
