var express = require("express");
var router = express.Router();
const db = require("../../database");

//--------------- get artifact page comment -------------------------
router.get("/comment/:id", function(req, res) {
  db.select()
    .from("Comment")
    .where({ Artifact_ArtifactID: req.params.id })
    .then(function(data) {
      res.json(data);
    });
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//----------------- post a comment ------------

router.post("/comment-add", function(req, res) {
  var date = new Date();
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDate();
  uniqueID = makeid(20);

  db("Comment")
    .insert({
      Artifact_ArtifactID: req.body.id,
      name: req.body.name,
      day: day,
      month: month,
      year: year,
      Comment: req.body.comment,
      uniqueID: uniqueID
    })
    .then(function(ret) {
      res.send("success");
    });
});

//---------------- edit a comment ----------------

router.put("/comment-edit", function(req, res) {

  db('Comment')
  .where({  uniqueID : req.body.uniqueID})
  .update({

    Comment: req.body.comment

  })
  .then(function(data) {
      res.send("success");
  });
});

//---------------- delete a comment ----------------

router.delete("/comment-delete/:id", function(req, res) {

  db("Comment")
  .where({ uniqueID: req.params.id })
  .del()
  .then(res.send("successs"))

});

module.exports = router;
