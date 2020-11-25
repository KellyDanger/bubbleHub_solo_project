const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// //gets all activiites from DB to populate activities survey
// router.get('/', (req, res) => {
//   let queryText = `SELECT * FROM "activities";`;
//   pool.query(queryText).then((result)=> {
//     res.send(result.rows)
//   }).catch((error)=> {
//     console.log('Error in GET activities');
//     res.sendStatus(500);
//   })
// });
//gets all activies for the logged in user
router.get(`/:id`, (req, res) => {
  let queryText = `SELECT "activities"."id","activities"."description", "activities"."riskLevel", "user_activities"."active" FROM "activities"
  JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
  JOIN "user" on "user"."id" = "user_activities"."user_id"
  WHERE "user"."id" = $1 ORDER BY "activities"."id";`;
  pool.query(queryText, [req.params.id]).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in getting user activities');
    res.sendStatus(500)
  })
})

//sends put request to DB with logged in user and selected activity to update said actiivty to active=true
router.put('/add', (req, res) => {
  let queryText = `UPDATE "user_activities" SET "active"= true WHERE "user_id" = $1 AND "activity_id" = $2;`;
  pool.query(queryText, [req.user.id, req.body.id]).then((result) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in put');
    res.sendStatus(500)
  })
})

router.put('/remove', (req, res) => {
  let queryText = `UPDATE "user_activities" SET "active"= false WHERE "user_id" = $1 AND "activity_id" = $2;`;
  pool.query(queryText, [req.user.id, req.body.id]).then((result) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in put');
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