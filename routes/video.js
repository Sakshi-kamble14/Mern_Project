const express = require("express")
const cryptojs = require("crypto-js")

const pool = require("../db/pool")
const result = require("../utils/result")
const { authAdmin } = require("../utils/auth")

const router = express.Router()


// below this all are admin routes
router.use(authAdmin)
router.get("/all_videos",(req,res) => {
    const {course_id} = req.query
    const sql = `SELECT * FROM videos WHERE course_id = ?`
    pool.query(sql,[course_id],(error,data)  => {
        res.send(result.createResult(error,data))
        })
  })

router.post("/add" , (req,res) =>{
    const  {course_id, title, youtube_url,description} = req.body
    const sql = `INSERT INTO videos (course_id, title, youtube_url,description) VALUES (?,?,?,?)`
    pool.query(sql,[course_id, title, youtube_url,description] , (error,data) => {
        res.send(result.createResult(error,data))
    })
})

router.put("/update/:video_id",(req,res) => {
    const { video_id } = req.params
    const {course_id, title, description,youtube_url} = req.body

    const sql = `UPDATE videos SET course_id = ?, title = ?, description = ?, youtube_url = ? WHERE video_id = ? `
    pool.query(sql,[course_id, title, description, youtube_url,video_id],(error,data) => {
        res.send(result.createResult(error,data));
    })

})

//added another approach for delete video using subscript logic
router.delete("/delete/:video_id",(req,res) => {
    const video_id = req.params.video_id
    const sql = `DELETE FROM videos WHERE video_id = ?`

    pool.query(sql,[video_id],(error,data) => {
        res.send(result.createResult(error,data))
    })
})
router.get("/all_video",(req,res) => {
    
    const sql = `SELECT * FROM videos`
    pool.query(sql,(error,data)  => {
        res.send(result.createResult(error,data))
        })
  })


module.exports = router
