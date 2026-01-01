const express=require('express')
const pool=require('../db/pool')
const result=require('../utils/result')
const { authAdmin, authenticateToken } = require('../utils/auth')

const router=express.Router()

// common route (accessed by anyone)
router.get('/all-active-courses',(request,response)=>{
 const sql = `SELECT * FROM courses WHERE end_date >= CURRENT_DATE()`;    
 pool.query(sql,(error,data)=>{
        response.send(result.createResult(error,data))
    })
})

router.get("/:course_id", (req, res) => {
  const { course_id } = req.params;

  const sql = "SELECT * FROM courses WHERE course_id = ?";

  pool.query(sql, [course_id], (error, data) => {
   res.send(result.createResult(error,data))
  });
});

router.post("/registerCourse/:course_id", (req, res) => {
  const { course_id } = req.params;
  const { name, email, mobile_no } = req.body;

  if (!name || !email || !mobile_no) {
    return res
      .status(400)
      .send(result.createResult("All fields are required"));
  }

  const checkSql =
    "SELECT reg_no FROM students WHERE email = ? AND course_id = ?";

  pool.query(checkSql, [email, course_id], (error, data) => {
    if (error) {
      return res.status(500).send(result.createResult(error.message));
    }

    if (data.length > 0) {
      return res
        .status(409)
        .send(result.createResult("Already registered for this course"));
    }

    const insertSql = `
      INSERT INTO students (name, email, mobile_no, course_id)
      VALUES (?, ?, ?, ?)
    `;

    pool.query(
      insertSql,
      [name, email, mobile_no, course_id],
      (error, data) => {
        if (error) {
          return res.status(500).send(result.createResult(error.message));
        }

        res.status(201).send(
          result.createResult(null, {
            message: "Course registered successfully",
            reg_no: data.insertId
          })
        );
      }
    );
  });
});

router.get("/my-courses/:email",authenticateToken, (req, res) => {

  const {email}=req.params
  
    const sql = `
        SELECT  c.course_id,c.course_name,s.name,s.email
        FROM students s
        JOIN courses c ON s.course_id = c.course_id where email=?
    `;
    pool.query(sql,[email],(error, data) => {

        if (data.length > 0) {
                    res.status(200).send(result.createResult(null, data));

        } else {
            res.status(404).send(result.createResult("Something went wrong! No courses found."));
        }

    });
});


// below this all are admin routes
router.use(authAdmin)
router.get("/all-courses", (request, response) => {
    const { startDate, endDate } = request.query


    let sql = `SELECT * FROM courses`
    let values = []

    if (startDate && endDate) {
        sql += ` WHERE start_date >= ? AND end_date <= ?`
        values = [startDate, endDate]
    }

    pool.query(sql, values, (error, data) => {
        response.send(result.createResult(error, data))
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

    const {course_name,description,fees,startDate,endDate,videoExpireDays} = request.body

    const sql = `UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE course_id =?`

    pool.query(sql,[course_name,description,fees,startDate,endDate,videoExpireDays,courseId],(error, data) => {
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
