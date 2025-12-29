const jwt = require('jsonwebtoken')

const config = require('./config')
const result = require('./result')

const allowedUrls = ['/user/login', '/user/register',
    '/course/all-active-courses'
];

function authenticateToken(request, response, next) {
    // for ever incoming request this middleware will be called
    const allAllowedUrls = allowedUrls;

    if (allAllowedUrls.includes(request.path)) {
         next(); // Skip authentication for allowed URLs
    }
    else {
        const token = req.headers.token
        if (!token)
            res.send(result.createResult('Token is missing'))
        else {
            try {
                const Payload = jwt.verify(token, config.JWT_SECRET)
                req.headers.email = Payload.email
                next();
            } catch (ex) {
                 response.status(401).send(result.createResult("Token not found"));
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
