export default (err, req, res, next) => {
  // Extract the status
  const status = err.status ? (status = err.status) : 400;

  // Log the exception
  console.log(err.message, err.status);

  //Return response
  res.status(status).json({ error: err.message });
};
