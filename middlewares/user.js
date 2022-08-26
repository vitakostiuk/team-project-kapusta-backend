const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {SECRET_KEY} = process.env;

const user = async(req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    
    try {
        if (bearer !== 'Bearer') {
        throw new Unauthorized('Not authorized');
    }
        const {id} = jwt.verify(token, SECRET_KEY);
        const authUser = await User.findById(id);
        if (!authUser || !authUser.token) {
            throw new Unauthorized('Not authorized')
        }
        req.user = authUser;
        next();
    } catch (error) {
        if (error.message === 'Invalid signature') {
            error.status = 401;
        }
        next(error);
    }
}

module.exports = user;