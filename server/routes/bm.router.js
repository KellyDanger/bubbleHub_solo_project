const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//sends sql query to retrieve a user by email
router.get('/:email', (req,res) => {
  let queryText = `SELECT "name", "id", "username", "hubNumber" FROM "user" WHERE "email" = $1;`;
  pool.query(queryText, [req.params.email]).then((result) => {
    res.send(result.rows[0])
  }).catch((error) => {
    console.log('error in get bm', error);
    res.sendStatus(500)
  })
})

//sends sql query to retrive all bubblemates for logged in user
router.get('/', (req, res) => {
  let queryText = `SELECT "user"."name", "user"."hubNumber", "user"."id" FROM "user"
  JOIN "bubble_mates_junction" on "user"."id" = "bm_id"
  WHERE "bubble_mates_junction"."bubble_owner" = $1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in get mybms', error);
    res.sendStatus(500)
  })
})

//sends sql query to add a bm relationship to the bm junction table
router.post('/', (req, res) => {
  let queryText = `INSERT INTO "bubble_mates_junction" ("bubble_owner", "bm_id") VALUES ($1, $2);`;
  pool.query(queryText, [req.user.id, req.body.bmId]).then((result) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in post');
    res.sendStatus(500)
  })
})

//deletes selected bm from user's bubble
router.delete('/:id', (req, res) => {
  let queryText = `DELETE FROM "bubble_mates_junction" WHERE "bubble_owner"= $1 AND "bm_id"=$2;`;
  pool.query(queryText, [req.user.id, req.params.id]).then((result) => {
    res.send(result);
  }).catch((error) => {
    res.sendStatus(500)
  })
})

module.exports = router;

// allen.joeg@gmail.com
// req.user.id