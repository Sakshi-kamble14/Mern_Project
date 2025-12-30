const express = require("express")
const pool = require("../db/pool")
const result = require("../utils/result")

const router = express.Router()
const cryptojs = require("crypto-js");


//Change_Password
router.put("/change_password", (req, res) => {

    //just added UI side confirm password validation, not used in db query
    const { newPassword, confirmPassword, email } = req.body;

    if (newPassword == confirmPassword) {
        const hashedPassword = cryptojs.SHA256(newPassword).toString();

        //check if given email is present in users table
        const checkEmailSql = `SELECT * FROM users WHERE email = ?`;
        pool.query(checkEmailSql, [email], (error, data) => {
            if (data.length <= 0) {
                return res.status(404).send(result.createResult("Email not found"));

            } else {
                const sql = `UPDATE users SET password = ? WHERE email = ?`;
                pool.query(sql, [hashedPassword, email], (error, data) => {
                    res.send(result.createResult(error, data));
                });
            }
        });

    }
    else {
        return res.status(400).send(result.createResult("New Password and Confirm Password do not match"));
    }
});



// get all courses
router.get("/my-courses", (req, res) => {

    const sql = `
        SELECT  c.course_id,c.course_name,s.name,s.email
        FROM students s
        JOIN courses c ON s.course_id = c.course_id
    `;
    pool.query(sql, (error, data) => {

        if (data.length > 0) {
                    res.status(200).send(result.createResult(null, data));

        } else {
            res.status(404).send(result.createResult("Something went wrong! No courses found."));
        }

    });
});



router.get("/my_courses_with_videos", (req, res) => {
   
    const email = req.query; 

    const sql = `
        SELECT c.course_id, c.course_name, s.name, s.email, v.video_id, v.title, v.youtube_url, v.description
        FROM students s
        JOIN courses c ON s.course_id = c.course_id
        JOIN videos v ON c.course_id = v.course_id
        WHERE s.email = ? 
        AND DATEDIFF(CURDATE(), v.added_at) <= c.video_expire_days`;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.status(500).send(result.createResult(error.message));
        }

        if (data.length > 0) {
            res.status(200).send(result.createResult(null, data));
        } else {
            res.status(404).send(result.createResult("No active courses found for this email."));
        }
    });
});

// ---------------- ALL STUDENTS ----------------
router.get("/all_students", (req, res) => {
  const sql = `
    SELECT 
      s.reg_no,
      s.name,
      s.email,
      IFNULL(c.course_name, 'N/A') AS course_name,
      s.mobile_no
    FROM students s
    LEFT JOIN courses c ON s.course_id = c.course_id
  `;

  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

// ---------------- FILTER BY COURSE ----------------
router.get("/all_students/by-course/:courseId", (req, res) => {
  const { courseId } = req.params;

  const sql = `
    SELECT 
      s.reg_no,
      s.name,
      s.email,
      c.course_name,
      s.mobile_no
    FROM students s
    JOIN courses c ON s.course_id = c.course_id
    WHERE s.course_id = ?
  `;

  pool.query(sql, [courseId], (error, data) => {
    res.send(result.createResult(error, data));
  });
});


module.exports = router
