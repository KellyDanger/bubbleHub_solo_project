const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets all activiites from DB to populate activities survey
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "activities";`;
  pool.query(queryText).then((result)=> {
    res.send(result.rows)
  }).catch((error)=> {
    console.log('Error in GET activities');
    res.sendStatus(500);
  })
});

//sends selected activity to the activity router
router.post('/', (req, res) => {
  console.log('POST', req.body, 'user', req.user.id);
  let queryText = `INSERT INTO "user_activities" ("activity_id", "user_id") VALUES ($1, $2);`;
  pool.query(queryText, [req.body.id, req.user.id]).then((result) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in post');
    res.sendStatus(500)
  })
})

//sends delete request for activity from logged in user's db
router.delete('/:id', (req, res) => {
  if(req.isAuthenticated()){
    console.log('REQ is', req.params);
  let queryText = `DELETE FROM "user_activities" WHERE "user_id" = $1 AND "activity_id" = $2;`;
  pool.query(queryText, [req.user.id, req.params.id]).then((result) => {
    console.log('success deleting', result);
    res.send(result);
  }).catch((error) => {
    console.log('error in deleting item', error);
    res.sendStatus(500);
  })
  }else {
    res.sendStatus(403)
  } 
})

module.exports = router;