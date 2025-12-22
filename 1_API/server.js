const express = require("express")

const userResult = require("./routers/video")

const app = express()

app.use(express.json())
app.use("/video",userResult)

app.listen(4000,"localhost",() => {
    console.log("server started at 4000 port");
})