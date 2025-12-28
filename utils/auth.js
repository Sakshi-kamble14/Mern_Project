const jwt = require('jsonwebtoken')

const config = require('./config')
const result = require('./result')

const allowedUrls = ['/user/login', '/user/register',
                    '/student/my_course_with_videos', '/student/my-courses',
                    '/course/all-courses', '/course/all-active-courses',
                    '/video/all-videos'
];

function authenticateToken(request, response, next) {
    // for ever incoming request this middleware will be called
    const allAllowedUrls = allowedUrls;

    if (allAllowedUrls.includes(request.path)) {
        return next(); // Skip authentication for allowed URLs
    }
    else {
        return verifyToken(request, response, next);
    }
}

function verifyToken(request, response, next) {
    const token = req.headers.token;
    if (token == null) {
        return response.status(401).send(result.createResult("Token not found"));
    }
    else {
        const Payload = jwt.verify(token, config.JWT_SECRET)
        req.headers.email = Payload.email
        next();
    }
}

function authAdmin(req, res, next) {
    if (req.headers.role == "admin")
        next()
    else
        res.send(result.createResult("You are not authorized"))
}

exports = { authenticateToken, authAdmin }
