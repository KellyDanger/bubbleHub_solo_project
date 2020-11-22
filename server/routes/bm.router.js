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

module.exports = router;

// allen.joeg@gmail.com