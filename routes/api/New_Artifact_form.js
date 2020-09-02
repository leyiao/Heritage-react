var express = require("express");
var router = express.Router();
const db = require("../../database");

// ------------------ add new artifact -----------------
router.post("/new", function(req, res) {
  var obj = req.body;

  var image_array = [];
  image_array.push(obj.photo_1);
  image_array.push(obj.photo_2);
  image_array.push(obj.photo_3);
  image_array.push(obj.photo_4);

  //get the location
  var Location = "";

  if (obj.New_Location == "") {
    Location = obj.Location_Tag[0];
  } else {
    Location = obj.New_Location;
  }

  //Get all the tags and make it separated by comma
  var Tags = "";
  for (var i = 0; i < obj.Tag.length; i++) {
    var temp = obj.Tag[i].id.split(":");
    if (Tags == "") {
      var temp_trim = temp[1].trim();
      Tags = temp_trim;
    } else {
      var temp_trim = temp[1].trim();
      Tags = Tags + "," + temp_trim;
    }
  }
  var type = "photo";
  var date = new Date();
  var Heir = null;
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDate();
  db("Artifact")
    .insert({
      Name: obj.title,
      Geotag: Location,
      Tags: Tags,
      DateAddedYear: year,
      DateAddedMonth: month,
      DateAddedDay: day,
      DateAcquireYear: obj.acquireYear,
      DateAcquireMonth: obj.acquireMonth,
      DateAcquireDay: obj.acquireDay,
      AccuracyAcquire: obj.accuracy,
      Description: obj.Description,
      Heir: Heir,
      CurrentOwner: obj.CurrentOwner,
      Type: type
    })
    .then(function(ret) {
      db.select()
        .from("Artifact")
        .then(function(data) {
          //take the latest artifact ID
          var latest_ID = data[data.length - 1].ArtifactID;

          //check if each photo column empty or not

          for (var i = 0; i < image_array.length; i++) {
            if (image_array[i] == "") {
              continue;
            } else {
              db("ArtifactImage")
                .insert({
                  Image: null,
                  Caption: null,
                  Artifact_ArtifactID: latest_ID,
                  FilePath: image_array[i]
                })
                .then();
            }
          }

          res.json(latest_ID);
        });
    });
});

router.delete("/delete-post/:id", function(req, res) {
  db("Artifact")
    .where({ ArtifactID: req.params.id })
    .del()
    .then(
        res.send("successs1")
    );
});

router.delete("/delete-photo/:id", function(req, res) {
  db("ArtifactImage")
  .where({ Artifact_ArtifactID: req.params.id })
  .del()
  .then(res.send("successs1"))
});

module.exports = router;
