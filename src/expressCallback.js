export default function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.header("Content-Type"),
        Referer: req.header("referer"),
        "User-Agent": req.header("User-Agent"),
        "API-key": req.header("API-key")
      }
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
