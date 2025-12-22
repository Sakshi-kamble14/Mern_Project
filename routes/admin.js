const express=require('express')
const pool=require('../db/pool')
const result=require('../utils/result')

const router=express.Router()


router.get("/all-courses", (request, response) => {
    const { startDate, endDate } = request.query


    const sql=`Select * from courses`
    
    
    pool.query(sql, [startDate,endDate], (error, data) => {
        console.log(data)
        response.send(result.createResult(error, data))
    })
})

router.get('/all-active-course',(request,response)=>{
 const sql = `SELECT * FROM courses WHERE start_date <= CURRENT_DATE() AND end_date >= CURRENT_DATE()`;    
 pool.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.post("/add-course", (request, response) => {
    const {courseName,description,fees,startDate,endDate,videoExpireDays} = request.body

    const sql = `INSERT INTO courses (course_name, description, fees, start_date, end_date, video_expire_days) VALUES (?,?,?,?,?,?) `

    pool.query(sql,[courseName, description, fees, startDate, endDate, videoExpireDays],(error, data) => {
            response.send(result.createResult(error, data))
        }
    )
})

router.put("/update/:courseId", (request, response) => {
    const { courseId } = request.params
    const {courseName,description,fees,startDate,endDate,videoExpireDays} = request.body

    const sql = `UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE course_id =?`

    pool.query(sql,[courseName,description,fees,startDate,endDate,videoExpireDays,courseId],(error, data) => {
            response.send(result.createResult(error, data))
        }
    )
})

router.delete("/delete/:courseId", (request, response) => {
    const { courseId } = request.params

    const sql = `DELETE FROM courses WHERE course_id=?`

    pool.query(sql, [courseId], (error, data) => {
        response.send(result.createResult(error, data))
    })
})

module.exports=router