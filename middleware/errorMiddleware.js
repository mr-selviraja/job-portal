const errorMiddleware = (err, req, res, next) => {
  res.status(500).send({
    message: "Something is wrong",
    success: false,
    err,
  });
};

export default errorMiddleware;
