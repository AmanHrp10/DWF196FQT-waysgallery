const { Photos, Post, User } = require('../../models');

exports.addPhoto = async (req, res) => {
  try {
    const { userId, fullname, posts } = req.user;
    const { file } = req;
    const fileImage = file.filename;

    //? User will uploaded
    const user = await User.findOne({
      where: {
        id: userId,
        posts,
      },
      include: {
        model: Post,
        as: 'posts',
        attributes: [id],
      },
    });

    const postId = user.posts[0];

    console.log(postId);

    const newPhoto = await Photos.create({
      image: fileImage,
      userId,
      postId: post.id,
    });

    const photo = await Photos.findOne({
      where: {
        id: newPhoto.id,
      },
      attributes: ['id', 'image'],
    });
    res.send({
      status: 'Request succes',
      message: 'Photo was uploaded',
      data: {
        photo,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
