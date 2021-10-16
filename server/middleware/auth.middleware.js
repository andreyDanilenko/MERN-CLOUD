const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = (req, res, next) => {

    console.log(req.method);
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Auth error' })
        }
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' })
    }

}

module.exports = authMiddleware;