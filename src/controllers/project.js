const { Project, ProjectImage, Hire } = require('../../models');

exports.addProject = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { hireId } = req.params;
    const { body, files } = req;

    console.log(files);

    //? Validation
    const schema = Joi.object({
      description: Joi.string().required(),
    });

    const { error } = schema.validate(
      { ...body, photos: files.photos },
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
              image: image.filename,
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
      });
      res.send({
        status: 'Request success',
        message: 'Video succesfully Added',
        data: {
          post: response,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
