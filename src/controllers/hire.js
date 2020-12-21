const {
  Hire,
  Transaction,
  Project,
  ProjectImage,
  User,
} = require('../../models');

const Joi = require('joi');

exports.approvedHire = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    const hire = await Hire.findOne({
      where: {
        id,
      },
    });
    if (!hire) {
      return res.send({
        status: 'Request failed',
        message: `Id ${id} not found`,
      });
    }

    const update = hire.update(
      { status: 'Success' },
      {
        where: {
          id,
        },
      }
    );

    if (!update) {
      return res.send({
        status: 'Request failed',
        message: 'Approved failed',
      });
    }

    const response = await Hire.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['orderBy', 'orderTo', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Project,
          as: 'project',
          include: {
            model: ProjectImage,
            as: 'images',
          },
        },
        {
          model: User,
          as: 'orderBy',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'orderTo',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.send({
      status: 'Request succes',
      message: 'Hire was Approved',
      data: {
        hire: response,
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

//? Rejected hire
exports.rejectedHire = async (req, res) => {
  const { id } = req.params;
  try {
    const hire = await Hire.findOne({
      where: {
        id,
      },
    });

    console.log(hire);
    if (!hire) {
      return res.send({
        status: 'Request failed',
        message: `Id ${id} not found`,
      });
    }

    const update = await hire.update(
      { status: 'Cancel' },
      {
        where: {
          id,
        },
      }
    );

    if (!update) {
      return res.send({
        status: 'Request failed',
        message: 'Canceled failed',
      });
    }

    const response = await Hire.findOne({
      where: {
        id: update.id,
      },
      attributes: {
        exclude: ['orderBy', 'orderTo', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'orderBy',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'orderTo',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.send({
      status: 'Request succes',
      message: 'Hire was Canceled',
      data: {
        hire: response,
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

//?

//? Add Hire
exports.createHire = async (req, res) => {
  const { id: orderBy } = req.user;
  const { id: orderTo } = req.params;
  const body = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: orderTo,
      },
    });

    console.log(user);

    if (user.id === orderBy) {
      return res.send({
        status: 'Request failed',
        message: 'Cannot Order to your self',
      });
    }

    const schema = Joi.object({
      title: Joi.string().min(5).required(),
      description: Joi.string().required(),
      started: Joi.date().required(),
      finished: Joi.date().required(),
      price: Joi.number().required(),
    });

    const { error } = schema.validate(
      { ...body },
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

    const hireCreate = await Hire.create({
      ...body,
      status: 'Waiting Accept',
    });

    await Transaction.create({
      hireId: hireCreate.id,
      orderByUserId: orderBy,
      orderToUserId: user.id,
    });

    if (!hireCreate) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed, please try again',
      });
    }

    const response = await Hire.findOne({
      where: { id: hireCreate.id },
      attributes: {
        exclude: ['orderBy', 'orderTo', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'orderBy',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'orderTo',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully create hiring',
      data: {
        hire: response,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
