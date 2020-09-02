var express = require("express");
var router = express.Router();
const db = require("../../database");

router.get("/timeline", function(req,res){
    db.select()
      .from("Artifact")
      .then(function(data){
        res.send(data);
      });
})

router.get("/timeline/year", function(req,res){
    db.select()
      .from("Artifact")
      .where({DateAcquireYear: req.query.searchYear})
      .then(function(data){
        res.send(data);
      });
})

router.get("/timeline/range", function(req,res){
    db.select()
      .from("Artifact")
      .whereBetween('DateAcquireYear', [req.query.lowerYear,req.query.upperYear])
      .then(function(data){
        res.send(data);
      });
})
router.get("/timeline/id", function(req,res){
  db.select()
    .from("ArtifactImage")
    .whereIn('Artifact_ArtifactID', req.query.id)
    .then(function(data){
      
      res.send(data[0]);
    });
})

module.exports = router;