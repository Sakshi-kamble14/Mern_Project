const jwt = require('jsonwebtoken')

const config = require('./config')
const result = require('./result')

const allowedUrls = ['/user/login', '/user/register',
    '/course/all-active-courses'
];

function authenticateToken(req, res, next) {
    // for ever incoming request this middleware will be called
    const allAllowedUrls = allowedUrls;

    if (allAllowedUrls.includes(req.path)) {
         next(); // Skip authentication for allowed URLs
    }
    else {
        const token = req.headers.token
        if (!token)
            res.send(result.createResult('Token is missing'))
        else {
            try {                
                const Payload = jwt.verify(token, config.SECRET)
                req.headers.email = Payload.email
                next();
            } catch (ex) {
                 res.status(401).send(result.createResult("Token not found"));
            }
        }
    }
}

function authAdmin(req, res, next) {
    if (req.headers.role == "admin")
        next()
    else
        res.send(result.createResult("You are not authorized"))
}

module.exports = { authenticateToken, authAdmin }
