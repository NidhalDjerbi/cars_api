class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;
  
  if(err.name == 'DocumentNotFoundError') res.notFound()

  res.status(statusCode || 500).json({
    status: "error",
    statusCode,
    message
  });
};
module.exports = {
  ApiError,
  handleError
};
