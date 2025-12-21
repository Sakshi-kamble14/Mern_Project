const express=require('express')
const pool=require('../db/pool')
const result=require('../utils/result')

const router=express.Router()




router.get('/all-active-course',(request,response)=>{
 const sql = `SELECT * FROM courses WHERE start_date <= CURRENT_DATE() AND end_date >= CURRENT_DATE()`;    pool.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.post("/add-course", (request, ressponse) => {
    const {courseName,description,fees,startDate,endDate,videoExpireDays} = request.body

    const sql = `INSERT INTO courses (course_name, description, fees, start_date, end_date, video_expire_days) VALUES (?,?,?,?,?,?) `

    pool.query(sql,[courseName, description, fees, startDate, endDate, videoExpireDays],(error, data) => {
            response.send(result.createResult(error, data))
        }
    )
})

router.put("/update/:courseId", (requset, response) => {
    const { courseId } = req.params
    const {courseName,description,fees,startDate,endDate,videoExpireDays} = requset.body

    const sql = `UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE course_id =?`

    pool.query(sql,[courseName,description,fees,startDate,endDate,videoExpireDays,courseId],(error, data) => {
            response.send(result.createResult(error, data))
        }
    )
})

router.delete("/delete/:courseId", (requset, response) => {
    const { courseId } = requset.params

    const sql = `DELETE FROM courses WHERE course_id=?`

    pool.query(sql, [courseId], (error, data) => {
        response.send(result.createResult(error, data))
    })
})

module.exports=router