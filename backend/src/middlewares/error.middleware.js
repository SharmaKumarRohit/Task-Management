module.exports = (error, req, res, next) => {
  res
    .status(500)
    .json({
      success: false,
      message: error.message || "Internal server error!",
    });
};
