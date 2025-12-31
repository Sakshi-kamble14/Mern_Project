const jwt = require("jsonwebtoken")
const config = require("./config")
const result = require("./result")

// ✅ TOKEN REQUIRED (for course registration, protected APIs)
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

<<<<<<< HEAD
  if (!authHeader)
    return res
      .status(401)
      .send(result.createResult("Token missing"))
=======
const allowedUrls = ['/user/login', '/user/register','/course/all-active-courses'];
>>>>>>> a3bf308f55bc257ba06dfa79c90b8776af17304f

  const token = authHeader.split(" ")[1]

<<<<<<< HEAD
  try {
    const decoded = jwt.verify(token, config.secret)
    req.user = decoded
    next()
  } catch (err) {
    return res
      .status(401)
      .send(result.createResult("Invalid token"))
  }
=======
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
>>>>>>> a3bf308f55bc257ba06dfa79c90b8776af17304f
}

// ✅ Only students can register
function onlyStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res.send(
      result.createResult("Only students can register for courses")
    )
  }
  next()
}

// ✅ Admin check (optional)
function authAdmin(req, res, next) {
  if (req.user.role === "admin") next()
  else res.send(result.createResult("You are not authorized"))
}

<<<<<<< HEAD
module.exports = {
  verifyToken,
  onlyStudent,
  authAdmin
}
=======
module.exports = { authenticateToken, authAdmin }
>>>>>>> a3bf308f55bc257ba06dfa79c90b8776af17304f
