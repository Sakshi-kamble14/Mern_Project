const express=require('express')


const app=express()
const PORT=7400
const courseRouter=require('./routes/course')
const studRouter = require("./routes/student")
const videoRouter = require("./routes/video")
const userRouter=require("./routes/user")

app.use(express.json())
app.use('/course',courseRouter)
app.use("/student",studRouter)
app.use("/video",videoRouter)
app.use("/user",userRouter)

app.listen(PORT,'localhost',()=>{
    console.log("Server started at port ",PORT)
})