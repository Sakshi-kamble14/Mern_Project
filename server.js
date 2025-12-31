const express=require('express')
const cors=require('cors')

<<<<<<< HEAD
const app = express()
const PORT = 7400

const cors = require("cors")

const courseRouter = require('./routes/course')
=======
const app=express()
const PORT=7400
const courseRouter=require('./routes/course')
>>>>>>> a3bf308f55bc257ba06dfa79c90b8776af17304f
const studRouter = require("./routes/student")
const videoRouter = require("./routes/video")
const userRouter=require("./routes/user")
const { authenticateToken } = require('./utils/auth')

app.use(cors())
app.use(express.json())
app.use(authenticateToken)
app.use('/course',courseRouter)
app.use("/student",studRouter)
app.use("/video",videoRouter)
app.use("/user",userRouter)

<<<<<<< HEAD
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
=======
app.listen(PORT,'localhost',()=>{
    console.log("Server started at port ",PORT)
>>>>>>> a3bf308f55bc257ba06dfa79c90b8776af17304f
})