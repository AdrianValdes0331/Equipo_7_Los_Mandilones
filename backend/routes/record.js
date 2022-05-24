const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/connect');

// Read favorites of user with id
recordRoutes.route("/api/favorites").get(async function(_req, res){
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching favorites!");
      }
      else{
        res.json(result);
      }
    });
});

//Add favorites of user with id
recordRoutes.route("api/addFavorite/:id").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const userQuery = {_id: req.params.id}
  const updates = {
    $push:
      {favorites: req.body}
  }
  const options = { upsert: true}
  dbConnect
    .collection("users")
    .updateOne(userQuery, updates, options, function (err, _result) {
      if (err){
        res.status(400).send("Error updating favorites with id ${userQuery.id}!")
      } 
      else{
        console.log("1 document updated");
      }
    });
});

recordRoutes.route("api/removeFavorite/:id").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const userQuery = {_id: req.params.id}
  const updates = {
    $pull:
      {favorites: req.body}
  }
  const options = { upsert: true}
  dbConnect
    .collection("users")
    .updateOne(userQuery, updates, options, function (err, _result) {
      if (err){
        res.status(400).send("Error updating favorites with id ${userQuery.id}!")
      } 
      else{
        console.log("1 document updated");
      }
    });
});

//Remove favorites of user with id

module.exports = recordRoutes;