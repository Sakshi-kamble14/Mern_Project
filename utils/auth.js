const jwt = require('jsonwebtoken')

const config = require('./config')
const result = require('./result')


const allowedUrls = ['/user/login', '/user/register','/course/all-active-courses','/user/registertocourse'];

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
                // console.log("Payload", Payload);
                
                req.headers.email = Payload.email
                req.headers.role = Payload.role
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


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ status: "error", error: "Token missing" })

  const token = authHeader.split(" ")[1]

  
  try {
    const decoded = jwt.verify(token, config.SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).send({ status: "error", error: "Invalid token" })
  }
}


function onlyStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res.send(
      result.createResult("Only students can register for courses")
    )
  }
  next()
}
module.exports = { authenticateToken, authAdmin,onlyStudent,verifyToken }