const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  let queryText = `SELECT sum("riskLevel"), count("riskLevel") FROM "activities"
  JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
  JOIN "user" ON "user"."id" = "user_activities"."user_id"
  WHERE "user"."id" = $1;`;
  pool.query(queryText, [req.params.id]).then((result) => {
    let hubNum = Math.round(Math.sqrt(result.rows[0].sum / result.rows[0].count))
    res.send({hubNumber: hubNum})
  }).catch((error) => {
    console.log('error in get hubNumber', error);
    res.sendStatus(500)
  })
})

router.put('/:id', (req, res) => {
  let queryText = `UPDATE "user" SET "hubNumber" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [req.params.id, req.body.user.id])
})


module.exports = router;