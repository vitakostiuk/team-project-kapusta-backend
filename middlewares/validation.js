const validation = (schema) => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            throw new Error(error.message);
        }
        next();
    }
    return func;
}

module.exports = validation;