const multer = require('multer');

exports.UploadFile = (file) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      return cb(null, Date.now() + '-' + file.originalname);
    },
  });

  //? handle channel table upload file
  filterPhoto = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = {
        message: 'Only image files are allowed!',
      };
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

  const maxSize = 10 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter: filterPhoto,
    limits: { fileSize: maxSize },
  }).single(file);

  //? Middleware
  return (req, res, next) => {
    upload(req, res, (err) => {
      //! Error validation
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      //! Error file not selected
      if (!req.file && !err)
        return res.status(400).send({
          message: 'Please select files to upload',
        });

      //! Error over size limits
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized 10MB',
          });
        }
        return res.status(400).send(err);
      }
      //? Next to controller
      return next();
    });
  };
};
