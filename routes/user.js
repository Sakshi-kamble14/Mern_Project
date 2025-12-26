const express = require('express')
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")


const pool = require('../db/pool')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const hashedPassword = cryptojs.SHA256(password).toString()
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    pool.query(sql, [email, hashedPassword], (error, data) => {
        if (error)
            res.status(500).send(result.createResult(error))
        else if (data.length == 0){
            res.status(401).send(result.createResult("Invalid email or password"))}
        else {
            const user = data[0]
            const payload = {
                email: user.email
            }
            const token = jwt.sign(payload, config.SECRET)
            res.status(201).send(result.createResult(null, token))
        }
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
module.exports = router
