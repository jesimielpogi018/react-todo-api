// Middleware to check if request body is empty
const noEmptyReqBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  next();
};

module.exports = {
    noEmptyReqBody,
};