const express = require("express");
const router = express.Router()

var db = require('../database');

// Get Obligation plan for a project
router.get('/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(obli_funding_date,'%m/%d/%y') as date, 
        obli_funding_type as FundingType, 
        obli_fiscal_year as "FiscalYear", 
        obli_projected as Projected, 
        obli_projected_total as "Projected Total", 
        obli_actual as Actual, 
        obli_actual_total as "Actual Total" 
    FROM view_obligation 
    WHERE project_id=${req.params.project_id}
    ORDER BY date`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

// Get Obligation Table Plan for a project 
router.get('/obligation_table/:project_id', (req, res) => {
    let sql = `
    SELECT 
        DATE_FORMAT(obli_funding_date,'%m/%d') as date, 
        obli_funding_type as FundingType, 
        obli_fiscal_year as "FiscalYear",
        obli_projected as Projected, 
        obli_projected_total as "Projected Total",
        obli_actual as "Actual", 
        obli_actual_total as "Actual Total" 
    FROM 
        view_obligation 
    WHERE 
        project_id=${req.params.project_id}
    ORDER BY date`;
    let query = db.query(sql, (err, results)=>{
        if(err){
            throw err
        }
        res.send(results)
    });
});

module.exports = router;