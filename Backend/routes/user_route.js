const express = require("express");
const router = express.Router()

var db = require('../database');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM users'
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

router.post('/', (req, res) => {
    const {contractor_company, userName, userRole, userEmail, mil_job_title} = req.body;
    let sql = `
    INSERT INTO users (
        contractor_company,
        user_name,
        user_role,
        user_email,
        mil_job_title) 
    VALUES (
        "${contractor_company}",
        "${userName}",
        "${userRole}", 
        "${userEmail}", 
        "${mil_job_title}"
        )`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
    console.log(req.body);
});

//Incase the user is put into the system wrong
router.put("/changeUserRole/:userid/role/:userRole/jobTitle/:jobTitle", (req, res)=>{
    let sql = `
    UPDATE users 
    SET 
        user_role = ${req.params.userRole}, 
        mil_job_title = ${req.params.jobTitle}
    WHERE id = ${req.params.userid} `;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    })
});

// router.post()

router.delete("/", (req, res)=>{
    res.send({message:"TODO: Make a delete user endpoint"})
});

router.get('/iptmembers/:project_id', (req, res) => {
    let sql = `
    SELECT 
        u.id, 
        u.mil_job_title, 
        u.user_name 
    FROM users u 
    INNER JOIN user_project_link upl on upl.user_id = u.id 
    WHERE upl.project_id = ${req.params.project_id}  
    AND u.user_role ='IPT Member' AND u.user_role != 'Admin'`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

router.get('/iptmembers/:project_id/jobTitle/:job_title', (req, res) => {
    let sql = `
    SELECT 
        u.id, 
        u.mil_job_title, 
        u.user_name 
    FROM users u 
    INNER JOIN user_project_link upl on upl.user_id = u.id 
    WHERE upl.project_id = ${req.params.project_id} 
    AND u.mil_job_title=${req.params.job_title}`;
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;