const jwt = require("jsonwebtoken")
const config = require("./config")
const result = require("./result")

// ✅ TOKEN REQUIRED (for course registration, protected APIs)
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res
      .status(401)
      .send(result.createResult("Token missing"))

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, config.secret)
    req.user = decoded
    next()
  } catch (err) {
    return res
      .status(401)
      .send(result.createResult("Invalid token"))
  }
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

module.exports = {
  verifyToken,
  onlyStudent,
  authAdmin
}
