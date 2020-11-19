const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req, res) => {
  console.log('req is', req.body);
  let queryText = `UPDATE "user" SET "tolerance" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [req.body.toleranceNum, req.body.userId]).then(result => {
    console.log('new tolerance is', result);
    res.sendStatus(202)
  }).catch(error => {
    console.log('error in put', error); 
  })
})


module.exports = router;