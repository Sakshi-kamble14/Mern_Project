const express=require('express')
const app=express()
const PORT=7400
const adminRouter=require('./routes/admin')

app.use(express.json())
app.use('/course',adminRouter)
app.listen(PORT,'localhost',()=>{
    console.log("Server started at port ",PORT)
})