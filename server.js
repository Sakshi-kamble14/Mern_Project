const express=require('express')


const app=express()
const PORT=7400
const adminRouter=require('./routes/admin')
const studRouter = require("./routes/student")
const videoRouter = require("./routes/video")

app.use(express.json())
app.use('/course',adminRouter)
app.use("/student",studRouter)
app.use("/video",videoRouter)

app.listen(PORT,'localhost',()=>{
    console.log("Server started at port ",PORT)
})