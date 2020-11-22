const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req, res) => {
  console.log('user is', req.body.userId);
  
  let queryText = `UPDATE "user" SET "tolerance" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [req.body.toleranceNum, req.body.userId]).then(result => {
    res.sendStatus(202)
  }).catch(error => {
    console.log('error in put tol', error); 
    res.sendStatus(500);
  })
})

//gets the tolerance number from logged in user
router.get('/', (req, res) => {
  // console.log('USER IS', req.params.id);
  let queryText = `SELECT "tolerance" FROM "user" WHERE "id" = $1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in GET TOLERANCE', error);
    res.sendStatus(500)
  })
})


module.exports = router;