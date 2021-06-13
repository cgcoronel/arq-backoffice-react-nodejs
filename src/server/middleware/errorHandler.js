/**
 * Error handler middleware.
 * @param {object} error throwable error.
 * @param {object} req   request object.
 * @param {object} res   response object.
 * @param {object} next  next middleware.
 * @returns {Promise}.
 */
const errorHandler = (err, req, res, next) => {
  //Return bad gateway if the error come with a status code.
  const { statusCode, status, statusText, message, detail = {} } = err;
  const statusResp = status || statusCode;
  const statusApiError = err && statusResp ? statusResp : 500;

  //Get detail.
  const messageError = message || statusText;
  const messageApiError =
    err && messageError ? messageError : 'Internal server Error';

  //Log in stderr and launch the exception to sentry.
  console.log({
    message: 'Error handler',
    messageApiError,
  });

  res.status(statusApiError).json({
    status: statusApiError,
    message: messageApiError,
    detail,
  });
};

module.exports = {
  errorHandler,
};
