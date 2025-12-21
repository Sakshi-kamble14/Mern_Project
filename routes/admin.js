const express=require('express')
const pool=require('../db/pool')
const result=require('../utils/result')

const router=express.Router()


router.get("/all-courses", (req, res) => {
    const { startDate, endDate } = req.query

    let sql = `SELECT * FROM courses`
    let values = []

    if (startDate && endDate) {
        sql += ` WHERE start_date >= ? AND end_date <= ?`
        values = [startDate, endDate]
    }

    pool.query(sql, values, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/all-active-course',(request,response)=>{
 const sql = `SELECT * FROM courses WHERE start_date <= CURRENT_DATE() AND end_date >= CURRENT_DATE()`;    pool.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.post("/add-course", (req, res) => {
    const {courseName,description,fees,startDate,endDate,videoExpireDays} = req.body

    const sql = `INSERT INTO courses (course_name, description, fees, start_date, end_date, video_expire_days) VALUES (?,?,?,?,?,?) `

    pool.query(sql,[courseName, description, fees, startDate, endDate, videoExpireDays],(error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.put("/update/:courseId", (req, res) => {
    const { courseId } = req.params
    const {courseName,description,fees,startDate,endDate,videoExpireDays} = req.body

    const sql = `UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE course_id =?`

    pool.query(sql,[courseName,description,fees,startDate,endDate,videoExpireDays,courseId],(error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.delete("/delete/:courseId", (req, res) => {
    const { courseId } = req.params

    const sql = `DELETE FROM courses WHERE course_id=?`

    pool.query(sql, [courseId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports=router