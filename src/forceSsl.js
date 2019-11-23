export default function(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    console.log(req.headers["x-forwarded-proto"]);
    if (req.headers["x-forwarded-proto"] != "https") {
      res.redirect(302, `https://${process.env.HOST}${req.url}`, next);
    } else {
      next();
    }
  } else {
    next();
  }
}
