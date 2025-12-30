const express = require('express')

const app = express()
const PORT = 7400

const cors = require("cors")

const courseRouter = require('./routes/course')
const studRouter = require("./routes/student")
const videoRouter = require("./routes/video")

const userRouter = require("./routes/user")
const auth = require('./utils/auth')

//middleware to parse json data
app.use(express.json())

app.use(cors())

// app.use(auth.authenticateToken)
// app.use(auth.authAdmin)

app.use('/course',courseRouter)
app.use("/student",studRouter)
app.use("/video",videoRouter)
app.use("/user",userRouter)


//routes (authentication NOT needed for login/register)
app.use("/user", userRouter)

// Apply authentication middleware ONLY to protected routes




app.listen(PORT, 'localhost', () => {
    console.log("Server started at port ", PORT)
})