const isFloat = (number) => {
  return number % 1 === 0;
};

module.exports = {
  assertQueryParam: (req, name, pattern) => {
    if (
      !pattern.test(req.query[name]) ||
      typeof req.query[name] === "undefined"
    ) {
      throw new Error(
        `Expected query parameter \`req.query.${name}\` to match pattern ${pattern}.`
      );
    }
  },
  assertInteger: (req, name) => {
    const num = Number(req.query[name]);
    if (Number.isNaN(num) || !Number.isInteger(num)) {
      throw new Error(
        `Expected query parameter \`req.query.${name}\` to be an integer value`
      );
    }
  },
  assertNumber: (req, name) => {
    const num = Number(req.query[name]);
    if (Number.isNaN(num)) {
      throw new Error(
        `Expected query parameter \`req.query.${name}\` to be a number`
      );
    }
  },
  assertBoolean: (req, name) => {
    const bool = req.query[name];
    if (bool !== "false" && bool !== "true") {
      throw new Error(
        `Expected query parameter \`req.query.${name}\` to be a boolean`
      );
    }
  }
};
