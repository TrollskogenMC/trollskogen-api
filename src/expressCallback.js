export default function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body || {},
      headers: {
        "API-key": req.header("API-key"),
        "Content-Type": req.header("Content-Type"),
        Referer: req.header("referer"),
        "User-Agent": req.header("User-Agent")
      },
      ip: req.ip,
      method: req.method,
      params: req.params,
      path: req.path,
      query: req.query
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.json(
          httpResponse.statusCode,
          httpResponse.body,
          httpResponse.headers || {}
        );
      })
      .catch(() => {
        res.json(500, { error: "An unkown error occurred." });
      });
  };
}
