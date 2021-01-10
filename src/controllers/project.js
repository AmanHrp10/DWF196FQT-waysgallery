const { Project, ProjectImage, Hire } = require('../../models');
const Joi = require('joi');

exports.getProjectById = async (req, res) => {
  const { id: hireId } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        hireId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: ProjectImage,
        as: 'images',
        // attributes: ['id', 'image'],
      },
    });

    if (!project) {
      return res.send({
        status: 'Request failed',
        message: "Can't find Project",
      });
    }

    res.send({
      status: 'Request success',
      message: 'Project success fetching',
      data: {
        project,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: hireId } = req.params;
    const { body, files } = req;

    const fileProject = files.images ? files.image[0].filename : null;
    const pathProject = files.images ? files.image[0].path : null;

    //? Validation
    const schema = Joi.object({
      description: Joi.string().required(),
      images: Joi.array().required(),
    });

    const { error } = schema.validate(
      { ...body, images: files.images },
      {
        abortEarly: false,
      }
    );

    if (error) {
      return res.send({
        status: 'Request failed',
        error: {
          message: error.details.map((err) => err.message),
        },
      });
    }

    const project = await Project.create({
      ...body,
      userId,
      hireId,
    });

    if (!project) {
      return res.send({
        status: 'Request failed',
        message: 'Failed to add project',
      });
    }

    const photo = async () => {
      return Promise.all(
        files.images.map(async (image) => {
          try {
            await ProjectImage.create({
              projectId: project.id,
              image: pathProject,
            });
          } catch (err) {
            console.log(err);
          }
        })
      );
    };

    const update = await Hire.update(
      { status: 'Complete' },
      { where: { id: hireId } }
    );

    if (!update) {
      return res.send({
        status: 'Request error',
        message: 'failed to approvement this action',
      });
    }

    photo().then(async () => {
      const response = await Hire.findOne({
        where: {
          id: hireId,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId', 'UserId'],
        },
        include: {
          model: Project,
          as: 'project',
          attributes: {
            exclude: ['hireId', 'userId', 'createdAt', 'updatedAt'],
          },
          include: {
            model: ProjectImage,
            as: 'images',
            attributes: ['id', 'image'],
          },
        },
      });
      res.send({
        status: 'Request success',
        message: 'Video succesfully Added',
        data: {
          hire: response,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

exports.download = async (req, res) => {
  const { id: hireId } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        hireId,
      },
      attributes: [],
      include: {
        model: ProjectImage,
        as: 'images',
        attributes: ['id', 'image'],
      },
    });

    if (!project) {
      return res.send({
        status: 'Request failed',
        message: "Can't find Project",
      });
    }

    res.send({
      project: project.images[0].image,
    });
  } catch (err) {
    return res.send({
      status: 'Request error',
      message: 'Server error',
    });
  }
};
