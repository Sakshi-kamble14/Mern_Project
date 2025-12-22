const express = require("express")
const pool = require("../db/pool")
const result = require("../utils/result")

const router = express.Router()



// 1

router.post("/register", (req, res) => {
    const { name, email,course_id , mobile_no } = req.body;
    const sql = `INSERT INTO students (name, email, course_id, mobile_no) VALUES (?, ?, ?, ?)`;
    
    pool.query(sql, [name, email, course_id, mobile_no], (error, data) => {
        res.send(result.createResult(error, data));
    });
});


//Change_Password

router.put("/change_password", (req, res) => {
    const { newPassword, confirmPassword,email } = req.body;
    const sql = `UPDATE users SET password = ? WHERE email = ?`;
    pool.query(sql, [newPassword, email], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

// 3

router.get("/courses", (req, res) => {
 
    const sql = `
        SELECT c.* FROM courses c
        INNER JOIN students s ON c.course_id = s.course_id
        WHERE s.email = ?`;

    pool.query(sql,(error, data) => {
        res.send(result.createResult(error, data));
    });
});

//4

router.get("/course_with_videos", (req, res) => {
  
    const sql = `
        SELECT c.course_name, v.title, v.youtube_url, v.added_at
        FROM students s
        JOIN courses c ON s.course_id = c.course_id
        JOIN videos v ON c.course_id = v.course_id
        WHERE DATEDIFF(CURDATE(), v.added_at) <= c.video_expire_days`

    pool.query(sql, (error, data) => {
        
        res.send(result.createResult(error, data));
    });
});
 module.exports = router