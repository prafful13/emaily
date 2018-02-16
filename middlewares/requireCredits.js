module.exports = (req, res, next) => {
  if (req.user.credits <= 0) {
    return res.status(403).send({ error: "you do not have enough credits" });
  }

  next();
};
