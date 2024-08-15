const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.fields);
    req.fields = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const errors = err.errors.map(e => ({ field: e.path[0], message: e.message }));

    const error = {
      status,
      message: "Validation error",
      errors,
    };

    console.log(error);
    res.status(status).json(error);
  }
};

module.exports = validate;
