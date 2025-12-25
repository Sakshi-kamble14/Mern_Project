const express=require('express')

const pool=require('../db/pool')
const result=require('../utils/result')

const router=express.Router()

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    const hashedPassword = cryptojs.SHA256(password).toString()
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    pool.query(sql, [email, hashedPassword], (error, data) => {
        if (error)
            res.send(result.createResult(error))
        else if (data.length == 0)
            res.send(result.createResult("Invalid email or password"))
        else {
            const user = data[0]
            // create the JWT token
            // inside the payload store the data that needs to be encryted into the token
            const payload = {

                email: user.email
            }
            const token = jwt.sign(payload, config.secret)
            const userData = {


                uid: user.uid,
                email: user.email
            }
            const token = jwt.sign(payload, config.SECRET)
            const userData = {
                name: user.name,
                mobile: user.mobile,

                token
            }
            res.send(result.createResult(null, userData))
        }
    })
})
router.post("/register", (req, res) => {
    const { name, email,course_id , mobile_no, password  } = req.body;
    // console.log("req.body");
    
    //insert into users table using just "Email", "Password"
    const insertUser = `INSERT INTO USERS (email, password, role) VALUES (?, ?, 'student')`
     pool.query(insertUser, [email, password], (error, data) => {
        if(error)
        res.send(result.createResult(error, data));
     })    
 
    const checkUser = `SELECT * FROM users WHERE email=?`
    pool.query(checkUser,[email],(error)=>{
        if(email.length === 0){
            res.send(result.createResult("User is not found .Please login first ")
        )
        }

    const sql = `INSERT INTO students (name, email, course_id, mobile_no) VALUES (?, ?, ?, ?)`;
        pool.query(sql, [name, email, course_id, mobile_no], (error, data) => {
        res.send(result.createResult(error, data));
    })

    });
});

module.exports=router