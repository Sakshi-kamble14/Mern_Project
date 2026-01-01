const express = require('express')
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")


const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')
const {verifyToken,onlyStudent}=require('../utils/auth')

const router = express.Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body

  const hashedPassword = cryptojs.SHA256(password).toString()
 

  const sql = `SELECT email, role FROM users WHERE email = ? AND password = ?`

  pool.query(sql, [email, hashedPassword], (error, data) => {
    
    if (error) {
      return res.status(500).send(result.createResult(error))
    }
   

    if (data.length === 0) {
      return res.status(401).send(
        result.createResult("Invalid email or password")
      )
    }

    const user = data[0]

    const token = jwt.sign({ email: user.email, role: user.role },config.SECRET)

    res.status(200).send(result.createResult(null, {token,role: user.role}))
})
})


router.post("/register", async (req, res) => {

    try {
        const { name, email, course_id, mobile_no, password } = req.body;
        const hashedPassword = cryptojs.SHA256(password).toString()

        // insert student function
        function insertStudent() {
            const sqlStudent = `INSERT INTO students (name, email, course_id, mobile_no) VALUES (?, ?, ?, ?)`
            pool.query(sqlStudent, [name, email, course_id, mobile_no], (error, data) => {
                if (error) {
                    return res.status(500).send(result.createResult(error))
                }
                return res.status(201).send(result.createResult(null, "User registered as a new student for this course."))
            })
        }

        // step1: Check duplicate email
        const checkEmail = `SELECT * FROM users WHERE email=?`
        pool.query(checkEmail, [email], (error1, data) => {
            if (error1) {
                return res.status(500).send(result.createResult(error1))
            }

            if (data.length > 0) {
                // step 2: Insert into students 
                insertStudent();
            } else {
                // step 3: insert into users
                const insertUser = `INSERT INTO users (email, password, role) VALUES (?, ?, 'student')`
                pool.query(insertUser, [email, hashedPassword], (error2, data) => {
                    if (error2) {
                        return res.status(500).send(result.createResult(error2))
                    }
                    // step 4: insert into students
                    insertStudent();
                })
            }

        });
    } catch (ex) {
        console.error("Database error:", ex);
        res.status(500).send(result.createResult(ex))
    }
})



router.post("/registertocourse",  (req, res) => {
    const { name, email,mobile_no } = req.body;

    // Validate input
    if (!name || !course_id || !mobile_no) {
        return res.status(400).send(result.createResult("All fields are required"));
    }

    const loggedInEmail = req.user.email; // Email from token

    // Step 1: Check if the student is already registered for the course
    const checkSql = "SELECT * FROM students WHERE email=? AND course_id=?";
    pool.query(checkSql, [loggedInEmail, course_id], (err, data) => {
        if (err) return res.status(500).send(result.createResult(err));

        if (data.length > 0) {
            return res.status(409).send(result.createResult("Already registered for this course"));
        }

        // Step 2: Insert the student into the course
        const insertSql = `
            INSERT INTO students (name, email, course_id, mobile_no, profile_pic)
            VALUES (?, ?, ?, ?, NULL)
        `;
        pool.query(insertSql, [name, loggedInEmail, course_id, mobile_no], (error, data) => {
            if (error) return res.status(500).send(result.createResult(error));
            res.status(201).send(result.createResult(null, "Course registration successful"));
        });
    });
});



module.exports = router
