const { User, Post } = require('../../models');
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
      return res.status(409).send({
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
    });
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      privateKey
    );

    res.send({
      status: 'Request success',
      message: 'Your account was registered',
      data: {
        user: {
          email: newUser.email,
          fullname: newUser.fullname,
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
      return res.status(400).send({
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
      include: {
        model: Post,
        as: 'posts',
      },
    });

    //?if email not exist
    if (!user) {
      return res.status(400).send({
        status: 'Request failed',
        error: {
          message: 'Invalid login',
        },
      });
    }

    //? take a password decrypt from database, and matching
    const passEncrypt = await bcrypt.compare(password, user.password);

    //? if not password
    if (!passEncrypt) {
      return res.status(401).send({
        status: 'Request failed',
        message: 'Invalid login',
      });
    }

    //? Init token login
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(
      {
        userId: user.id,
        fullname: user.fullname,
        posts: user.posts,
      },
      privateKey
    );

    //? Response login
    res.status(200).send({
      status: 'Request succes',
      message: 'Successfully login',
      data: {
        user: {
          email: user.email,
          fullname: user.fullname,
          token,
        },
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
