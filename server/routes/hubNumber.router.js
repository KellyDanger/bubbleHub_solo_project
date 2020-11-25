const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get the hubnumber data and calculate the hubNumber for the current user return the hub number to the saga
router.get('/', (req, res) => {
  let queryText = `SELECT sum("riskLevel"), count("riskLevel") FROM "activities"
  JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
  JOIN "user" ON "user"."id" = "user_activities"."user_id"
  WHERE "user"."id" = $1 AND "user_activities"."active"=true;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    let hubNum = Math.round(Math.sqrt(result.rows[0].sum / result.rows[0].count))
    res.send({hubNumber: hubNum})
  }).catch((error) => {
    console.log('error in get hubNumber', error);
    res.sendStatus(500)
  })
})

//Adds hubnumber to DB
router.put('/', (req, res) => {
  let queryText = `UPDATE "user" SET "hubNumber" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [req.body.num, req.user.id]).then(result => {
    res.sendStatus(200)
  }).catch(error => {
    console.log('error in put HN', error);
    res.sendStatus(500);
  })
})


module.exports = router;