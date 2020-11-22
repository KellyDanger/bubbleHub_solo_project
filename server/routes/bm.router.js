const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//sends sql query to retrieve a user by email
router.get('/:email', (req,res) => {
  let queryText = `SELECT "name", "id", "username" FROM "user" WHERE "email" = $1;`;
  pool.query(queryText, [req.params.email]).then((result) => {
    res.send(result.rows[0])
  }).catch((error) => {
    console.log('error in get bm', error);
    res.sendStatus(500)
  })
})

//sends sql query to add a bm relationship to the bm junction table
router.post('/', (req, res) => {
  console.log('in the BM router', req.user.id, req.body.bmId);
  let queryText = `INSERT INTO "bubble_mates_junction" ("bubble_owner", "bm_id") VALUES ($1, $2);`;
  pool.query(queryText, [req.user.id, req.body.bmId]).then((result) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.log('error in post');
    res.sendStatus(500)
  })
})


module.exports = router;

// allen.joeg@gmail.com
// req.user.id