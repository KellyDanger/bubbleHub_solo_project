const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req, res) => {
  console.log('req is', req.body);
  let queryText = `UPDATE "user" SET "tolerance" = 3 WHERE "id" = 1;`;
  pool.query(queryText).then(result => {
    console.log('new tolerance is', result);
    res.sendStatus(202)
  }).catch(error => {
    console.log('error in put', error); 
  })
})


module.exports = router;