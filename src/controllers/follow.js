const { User, Follow, Post, Photos } = require('../../models');
const Joi = require('joi');

exports.addFollow = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    //? Handle subscribe yourself
    if (userId === id) {
      return res.send({
        status: 'Request failed',
        message: 'Cannot Following yourself',
      });
    }

    const checkUser = await User.findOne({
      where: {
        id,
      },
    });

    //? Check existed of channel
    if (!checkUser) {
      return res.send({
        status: 'Request failed',
        message: 'User not found',
      });
    }

    const followed = await Follow.findOne({
      where: {
        followingId: id,
        followerId: userId,
      },
    });

    // //? Check subscribtion existed
    if (followed) {
      return res.send({
        status: 'Request failed',
        message: 'Cannot Follow this user again',
        data: {
          id: followed.followingId,
        },
      });
    }

    //? Add subscribe
    await Follow.create({
      followingId: id,
      followerId: userId,
    });

    //? Get channel was subscribed
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
          exclude: ['createdAt', 'updatedAt', 'userId', 'UserId'],
        },
        include: {
          model: Photos,
          as: 'photos',
          attributes: ['id', 'image'],
        },
      },
    });

    console.log(user);

    res.send({
      status: 'Request success',
      message: 'Follow was added',
      count: user.length,
      data: {
        following: {
          user,
        },
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

exports.deleteFollow = async (req, res) => {
  try {
    //? Init id Channel & Subscribtion
    const { id: follower } = req.user;
    const { id: following } = req.params;

    //? Filter Subscribe
    const followed = await Follow.findOne({
      where: {
        followingId: following,
        followerId: follower,
      },
    });

    //! if ID not match on params
    if (!followed) {
      return res.send({
        status: 'Request failed',
        message: 'Resource not found',
      });
    }

    //? Delete action
    followed.destroy();

    //? Response
    res.send({
      status: 'Request success',
      message: 'Success to unfollow',
      data: {
        id: following,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Get My Following Post
exports.getFollowingPost = async (req, res) => {
  try {
    const { id } = req.user;

    //? Get channel as login user
    const follow = await User.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: 'following',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
        through: {
          attributes: [],
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
            attributes: ['id', 'image'],
          },
        },
      },
    });

    if (!follow) {
      return res.send({
        status: 'Request failed',
        message: "Haven't following another user",
      });
    }

    // //? Contains on array
    const posts = follow.following.map((post) => post.posts);
    let post = [];
    for (i = 0; i < posts.length; i++) {
      for (j = 0; j < posts[i].length; j++) {
        post.push(posts[i][j]);
      }
    }

    console.log(post);
    res.send({
      status: 'Request succes',
      message: 'Subscribtion was fetching',
      // count: video.length,
      data: {
        following: post,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Get Following id
exports.getFollowId = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const follow = await Follow.findOne({
      where: {
        followingId: id,
        followerId: userId,
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'password',
          'fullname',
          'avatar',
          'greeting',
          'id',
          'email',
        ],
      },
    });

    if (!follow) {
      return res.send({
        status: 'Request failed',
        message: 'Follower not found',
      });
    }
    res.send({
      status: 'Request success',
      message: 'Follow was fetched',
      data: {
        follow,
      },
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
