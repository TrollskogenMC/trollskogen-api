export default function(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] != "https") {
      res.redirect(302, `https://${process.env.HOST}${req.url}`, next);
    } else {
      next();
    }
  } else {
    next();
  }
}
