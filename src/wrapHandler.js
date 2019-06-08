module.exports = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res);
    if (!res.headersSent) {
      res.send(200, result);
    }
  } catch (e) {
    res.send(400, {
      error: {
        message: e.message
      }
    });
  }

  next();
};
