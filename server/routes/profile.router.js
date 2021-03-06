const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//adds user's data and master user_activity dataset to DB
router.put('/', async (req, res) => {
  if(req.isAuthenticated()) {
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
      const queryText2 = `INSERT INTO "user_activities" ("activity_id", "user_id") VALUES (1, $1),(2, $1),(3, $1),(4, $1),(5, $1),(6, $1),(7, $1),(8, $1),(9, $1),(10, $1),(11, $1),(12, $1),(13, $1),(14, $1),(15, $1),(16, $1),(17, $1),(18, $1),(19, $1),(20, $1),(21, $1),(22, $1),(23, $1),(24, $1),(25, $1),(26, $1),(27, $1),(28, $1),(29, $1),(30, $1),(31, $1),(32, $1),(33, $1),(34, $1),(35, $1),(36, $1),(37, $1),(38, $1),(39, $1),(40, $1),(41, $1),(42, $1),(43, $1),(44, $1),(45, $1),(46, $1),(47, $1),(48, $1),(49, $1);`;
      await connection.query(queryText2, [userId]);
      await connection.query(`COMMIT;`);
      res.sendStatus(201)
    }catch(error){
      await connection.query('ROLLBACK');
      res.sendStatus(500);
    }finally {
      connection.release();
    } 
  }else {
    res.sendStatus(403)
  }
})


module.exports = router;