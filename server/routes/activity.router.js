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
  console.log('req is', req.body.activitiesArray, req.body.userId);
  let activitiesArray = req.body.activitiesArray
  for(let val of activitiesArray) {
    console.log('each item is', val);
    let queryText = `INSERT INTO "user_activities" ("activity_id", "user_id") VALUES (${val}, ${req.body.userId});`;
    pool.query(queryText).then((result) => {
      // res.send(result.rows) 
  }).catch((error) => {
    console.log('error in post');
    return res.sendStatus(500);
  })
  }
})



module.exports = router;