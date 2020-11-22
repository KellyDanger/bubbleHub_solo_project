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

//sends selected activity to the activity router
router.post('/', (req, res) => {
  let queryText = `INSERT INTO "user_activities" ("activity_id", "user_id") VALUES ($1, $2);`;
  pool.query(queryText, [req.body[0].id, req.body[1] ]).then((result) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in post');
    res.sendStatus(500)
  })
})

//sends delete request for activity from logged in user's db
router.delete('/:user/:id', (req, res) => {
  if(req.isAuthenticated()){
    console.log('REQ is', req.params);
  let queryText = `DELETE FROM "user_activities" WHERE "user_id" = $1 AND "activity_id" = $2;`;
  pool.query(queryText, [req.params.user, req.params.id]).then((result) => {
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
// TODO FIX THIS ERROR


//TODO post to user_activity table
// router.post('/', (req, res) => {
//   console.log('req is', req.body.activitiesArray, req.body.userId);
//   let activitiesArray = req.body.activitiesArray
//   for(let val of activitiesArray) {
//     console.log('each item is', val);
//     let queryText = `INSERT INTO "user_activities" ("activity_id", "user_id") VALUES (${val}, ${req.body.userId});`;
//     pool.query(queryText).then((result) => {  
//   }).catch((error) => {
//     console.log('error in post');
//     return res.sendStatus(500);
//   })
//   } res.sendStatus(200)
// })



module.exports = router;