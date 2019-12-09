async function expressCallback({ error, req, res, controller }) {
  const httpRequest = {
    body: req.body || {},
    error,
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
  try {
    const httpResponse = await controller(httpRequest);
    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }
    res.json(
      httpResponse.statusCode,
      httpResponse.body,
      httpResponse.headers || {}
    );
  } catch (e) {
    res.json(500, { error: "An unkown error occurred." });
  }
}

export function makeCallback(controller) {
  return (req, res) => {
    expressCallback({ controller, req, res });
  };
}

export function makeErrorCallback(controller) {
  return (req, res, error) => {
    expressCallback({ controller, error, req, res });
  };
}
