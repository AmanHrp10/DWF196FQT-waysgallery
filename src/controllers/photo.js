const { Photos, Post } = require('../../models');

exports.addPhoto = async (req, res) => {
  try {
    const { userId, fullname, posts } = req.user;
    const { file } = req;
    const fileImage = file.filename;

    console.log(posts);

    const newPhoto = await Photos.create({
      image: fileImage,
      postId: posts.map((post) => post.id),
      userId,
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
