const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req, res) => {
  let queryText = `UPDATE "user" 
  SET "name" = $1, "email" = $2, "city" = $3, "state" = $4
  WHERE "id" = $5;
  `;
  pool.query(queryText, [req.body.name, req.body.email, req.body.city, req.body.state, req.body.userId]).then(result => {
    res.sendStatus(200)
  }).catch(error => {
    console.log('error in put', error); 
    res.sendStatus(500)
  }) 
})


module.exports = router;