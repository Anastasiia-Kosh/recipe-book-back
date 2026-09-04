import { HttpError } from 'http-errors';
import multer from 'multer';
import { isCelebrateError } from 'celebrate';

export const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const details = [];

    for (const [, joiError] of err.details) {
      for (const detail of joiError.details) {
        details.push(detail.message);
      }
    }

    return res.status(400).json({
      message: 'Validation failed',
      details,
    });
  }
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        message: 'Image must not exceed 4 MB',
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  req.log?.error({ err }, 'Unhandled server error');

  res.status(500).json({
    message: 'Internal server error',
  });
};
