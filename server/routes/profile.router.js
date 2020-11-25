const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//adds user's data and master user_activity dataset to DB
router.put('/', async (req, res) => {
  const name=req.body.name;
  const email=req.body.email;
  const city=req.body.city;
  const state=req.body.state;
  const userId=req.body.userId;
  //set up single pool connection for transaction
  const connection = await pool.connect();
  //try catch to perform data add and master activity add
  try{
    await connection.query('BEGIN');
    const queryText1= `UPDATE "user" 
    SET "name" = $1, "email" = $2, "city" = $3, "state" = $4
    WHERE "id" = $5;`;
    await connection.query(queryText1, [name, email, city, state, userId]);
//query to add master list of activitis to user_actiivities junction table
    const queryText2 = `INSERT INTO "user_activities" ("activity_id", "user_id") VALUES (22, $1),(23, $1),(24, $1),(25, $1),(26, $1),(27, $1),(28, $1),(29, $1),(30, $1),(31, $1),(32, $1),(33, $1),(34, $1),(35, $1),(36, $1),(37, $1),(38, $1),(39, $1),(40, $1),(41, $1),(42, $1),(43, $1),(44, $1),(45, $1),(46, $1),(47, $1),(48, $1),(49, $1),(50, $1),(51, $1),(52, $1),(53, $1),(54, $1),(55, $1),(56, $1),(57, $1),(58, $1),(59, $1),(60, $1),(61, $1),(62, $1),(63, $1),(64, $1),(65, $1),(66, $1),(67, $1),(68, $1),(69, $1),(70, $1);`;
    await connection.query(queryText2, [userId]);
    await connection.query(`COMMIT;`);
    res.sendStatus(201)
  }catch(error){
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  }finally {
    connection.release();
  } 
})


module.exports = router;