module.exports = handler => (req, res, next) => {
  try {
    handler(req, res, next);
  } catch (e) {
    next(e);
  }
};
