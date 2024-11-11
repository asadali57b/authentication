
const jwt = require('jsonwebtoken');
const jwt_sect = 'userData';
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, jwt_sect);
        req.user = decoded;  
        next();  
    } catch (ex) {
        if (ex.name === 'TokenExpiredError') {
            return res.status(400).send("Token expired");
        } else if (ex.name === 'JsonWebTokenError') {
            return res.status(400).send("Invalid token");
        } else {
            return res.status(400).send("Token verification failed");
        }
    }
}

module.exports = auth;
