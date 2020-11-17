const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "activities";`;
  pool.query(queryText).then((result)=> {
    res.send(result.rows)
  }).catch((error)=> {
    console.log('Error in GET activities');
    res.sendStatus(500);
  })
});
//TODO post to user_activity table
router.post('/', (req, res) => {
  console.log('in post', req.body);
})



module.exports = router;