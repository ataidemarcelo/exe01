module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(err.statusCode).json({ message: err.details[0].message });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json({ message: `Internal server error: ${err.message}` });
};
