const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req, res) => {
  let queryText = ``;
  pool.query(queryText).then((result)=> {
    res.send(result.rows)
  }).catch((error)=> {
    console.log('Error in GET activities');
    res.sendStatus(500);
  })
});



module.exports = router;