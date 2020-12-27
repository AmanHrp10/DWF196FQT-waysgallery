const { User, Post, Art, Photos } = require('../../models');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { post } = require('../routes');

exports.register = async (req, res) => {
  try {
    const { body } = req;
    const schema = Joi.object({
      email: Joi.string().email().min(10).required(),
      password: Joi.string().min(8).required(),
      fullname: Joi.string().min(2).required(),
    });
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(500).send({
        status: 'Validation error',
        message: error.details.map((err) => err.message),
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (checkEmail) {
      return res.send({
        status: 'Request failed',
        message: 'Email already exist',
      });
    }

    const { email, password, fullname } = body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: passwordHash,
      fullname,
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
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        id: newUser.id,
      },
      privateKey
    );

    res.send({
      status: 'Request success',
      message: 'Your account was registered',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          fullname: newUser.fullname,
          avatar: newUser.avatar,
          greeting: newUser.greeting,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    //? Record data from form-data
    const { body } = req;

    //? Validation
    const schema = Joi.object({
      email: Joi.string().email().required().min(10),
      password: Joi.string().required().min(8),
    });

    //? Selection error form validation
    const { error } = schema.validate(body, { abortEarly: false });

    //? Show error
    if (error) {
      return res.send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    //? Record data from form-data
    const { email, password } = req.body;

    //? check-in existed email
    const user = await User.findOne({
      where: {
        email,
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

    //?if email not exist
    if (!user) {
      return res.send({
        status: 'Request failed',
        message: 'Invalid login',
      });
    }

    //? take a password decrypt from database, and matching
    const passEncrypt = await bcrypt.compare(password, user.password);

    //? if not password
    if (!passEncrypt) {
      return res.send({
        status: 'Request failed',
        message: 'Invalid login',
      });
    }

    //? Init token login
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        id: user.id,
      },
      privateKey
    );

    //? Response login
    res.send({
      status: 'Request success',
      message: 'Successfully login',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          avatar: user.avatar,
          greeting: user.greeting,
          token,
        },
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
