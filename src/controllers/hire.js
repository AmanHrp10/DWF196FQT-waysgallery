const { Hire, Project, ProjectImage, User } = require('../../models');

exports.approvedHire = async (req, res) => {
  const { id } = req.params;
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

    const update = Hire.update(
      { status: 'Approved' },
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
          as: 'orderedBy',
          attributes: ['id', 'email', 'fullname'],
        },
        {
          model: User,
          as: 'orderedTo',
          attributes: ['id', 'email', 'fullname'],
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
  } catch (er) {
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
    if (!hire) {
      return res.send({
        status: 'Request failed',
        message: `Id ${id} not found`,
      });
    }

    const update = Hire.update(
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
          as: 'orderedBy',
          attributes: ['id', 'email', 'fullname'],
        },
        {
          model: User,
          as: 'orderedTo',
          attributes: ['id', 'email', 'fullname'],
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
      message: 'Server error',
    });
  }
};

//? Add Hire
exports.createHire = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  try {
    const hire = await Hire.create({
      ...body,
      status: 'Pending',
      orderBy: id,
    });
    if (!hire) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed, please try again',
      });
    }

    const response = await Hire.findOne({
      where: { id: hire.id },
      attributes: {
        exclude: ['orderBy', 'orderTo', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'orderedBy',
          attributes: ['id', 'email', 'fullname'],
        },
        {
          model: User,
          as: 'orderedTo',
          attributes: ['id', 'email', 'fullname'],
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
      message: 'Server error',
    });
  }
};
