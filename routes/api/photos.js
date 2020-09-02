var express = require("express");
var router = express.Router();
const db = require("../../database");

//--------------- get search -------------------------

router.get("/get-search", function(req, res) {
  db.select()
    .from("Entity")
    .then(function(entity) {
      db.select()
        .from("Artifact")
        .then(function(artifact) {
          db.select()
            .from("ArtifactImage")
            .then(function(image) {
              //----------------Parse out from frontend array before query to backend-----------------
              var Array1 = req.query.array;
              var num_of_tags = Array1.length;

              var Filtered_FamilyMember = [];
              var Entity = [];
              var Location = [];
              var Year = [];
              var Tags = [];
              for (var i = 0; i < Array1.length; i++) {
                var arraySplit = Array1[i].split(":");

                if (arraySplit[0] == "Location") {
                  Location.push(arraySplit[1].trim());
                }
                if (arraySplit[0] == "FM") {
                  var FirstName = arraySplit[1].split(" ");
                  Filtered_FamilyMember.push(FirstName[1]);
                }
                if (arraySplit[0] == "Year") {
                  Year.push(arraySplit[1].trim());
                }
                if (arraySplit[0] == "Entity") {
                  var Entity_Name = arraySplit[1];

                  Entity.push(Entity_Name);
                }
                if (arraySplit[0] == "Tags") {
                  Tags.push(arraySplit[1].trim());
                }
              }

              var obj = {
                ArtifactID_save_family_member: [],
                ArtifactID_save_Location: [],
                ArtifactID_save_Tags: [],
                ArtifactID_save_Entity: [],
                ArtifactID_save_Year: []
              };

              var Entity_From_DB = entity;

              //--------------FamilyMember and Entity Queries---------------

              if (Filtered_FamilyMember.length != 0) {
                //Search in Entity Table to find which artifact has this tag

                for (var i = 0; i < Filtered_FamilyMember.length; i++) {
                  for (var j = 0; j < Entity_From_DB.length; j++) {
                    if (Entity_From_DB[j].tag != null) {
                      var temparr = [];
                      temparr.push(Entity_From_DB[j].tag);
                      var temparrSplit = temparr[0].split(",");

                      if (
                        temparrSplit.includes(Filtered_FamilyMember[i]) == true
                      ) {
                        obj.ArtifactID_save_family_member.push(
                          Entity_From_DB[j].Artifact_ArtifactID
                        );
                      }
                    }
                  }
                }
              }

              // Entity Queries

              if (Entity.length != 0) {
                for (var i = 0; i < Entity.length; i++) {
                  for (var j = 0; j < Entity_From_DB.length; j++) {
                    if (Entity_From_DB[j].tag != null) {
                      var temparr = [];
                      temparr.push(Entity_From_DB[j].tag);
                      var temparrSplit = temparr[0].split(",");

                      if (temparrSplit.includes(Entity[i].trim()) == true) {
                        obj.ArtifactID_save_Entity.push(
                          Entity_From_DB[j].Artifact_ArtifactID
                        );
                      }
                    }
                  }
                }
              }
              //Location, tags , year Queries

              if (Location.length != 0) {
                for (var j = 0; j < Location.length; j++) {
                  for (var i = 0; i < artifact.length; i++) {
                    if (artifact[i].Geotag == Location[j]) {
                      obj.ArtifactID_save_Location.push(artifact[i].ArtifactID);
                    }
                  }
                }
              }

              if (Year.length != 0) {
                for (var j = 0; j < Year.length; j++) {
                  for (var i = 0; i < artifact.length; i++) {
                    if (artifact[i].DateAcquireYear == Year[j]) {
                      obj.ArtifactID_save_Year.push(artifact[i].ArtifactID);
                    }
                  }
                }
              }

              if (Tags.length != 0) {
                for (var j = 0; j < Tags.length; j++) {
                  for (var i = 0; i < artifact.length; i++) {
                    if (artifact[i].Tags != null) {
                      var temparr = [];
                      temparr.push(artifact[i].Tags);

                      var temparrSplit = temparr[0].split(",");

                      if (temparrSplit.includes(Tags[j])) {
                        obj.ArtifactID_save_Tags.push(artifact[i].ArtifactID);
                      }
                    }
                  }
                }
              }

              //-------------------- Getting search results ------------------//

              // pre determine type of search ( either one or two)

              var group = [];
              var result = [];
              var category_counter = 0;
              var send_to_front = [];

              function convert_to_ArtifactID(params) {
                //get artifact detail
                var tempArr = [];

                for (var i = 0; i < params.length; i++) {
                  var temp_obj = {
                    detail: {},
                    image: {}
                  };
                  for (var j = 0; j < artifact.length; j++) {
                    if (params[i] == artifact[j].ArtifactID) {
                      temp_obj.detail = artifact[j];
                    }
                  }
                  first_photo_only = true;
                  for (var k = 0; k < image.length; k++) {
                    if (
                      params[i] == image[k].Artifact_ArtifactID &&
                      first_photo_only == true
                    ) {
                      first_photo_only = false;

                      temp_obj.image = image[k];
                    }
                  }
                  tempArr.push(temp_obj);
                }

                return tempArr;
              }
              //merge all arrays into One
              for (var i = 0; i < Object.values(obj).length; i++) {
                if (Object.values(obj)[i].length > 0) {
                  category_counter += 1;
                }
              }
              function get_Similarity(counts) {
                var tempArr = [];
                for (var i = 0; i < Object.values(counts).length; i++) {
                  if (Object.values(counts)[i] == num_of_tags) {
                    tempArr.push(Object.keys(counts)[i]);
                  }
                }

                return tempArr;
              }
              function concat_Array(obj) {
                var result_Temp = [];
                for (var i = 0; i < Object.values(obj).length; i++) {
                  if (Object.values(obj)[i].length > 0) {
                    result_Temp = result_Temp.concat(Object.values(obj)[i]);
                  }
                }
                return result_Temp;
              }

              //---------------------SEARCH TYPE#1 : One tag----------------------------

              if (num_of_tags == 1) {
                result = concat_Array(obj);
                //remove duplicates
                let unique = [...new Set(result)];

                send_to_front = send_to_front.concat(
                  convert_to_ArtifactID(unique)
                );

                res.send(send_to_front);
              }
              //---------------------SEARCH TYPE#1 :Multple/ One Category----------------------------
              if (
                num_of_tags == 2 ||
                num_of_tags == 3 ||
                num_of_tags == 4 ||
                num_of_tags == 5
              ) {
                result = concat_Array(obj);

                var counts = {};
                result.forEach(function(x) {
                  counts[x] = (counts[x] || 0) + 1;
                });

                new_result = get_Similarity(counts);

                send_to_front = send_to_front.concat(
                  convert_to_ArtifactID(new_result)
                );

                res.send(send_to_front);
              }
            });
        });
    });
});

// --------------- Get all entity -------------------------

router.get("/entity", function(req, res) {
  db.select()
    .from("Entity")
    .then(function(data) {
      res.send(data);
    });
});

//--------------- get all artifact page -------------------------

router.get("/photo-all", function(req, res) {
  db.select()
    .from("Artifact")
    .then(function(data) {
      res.send(data);
    });
});

//--------------- get all artifact Image -------------------------

router.get("/image-all", function(req, res) {
  db.select()
    .from("ArtifactImage")
    .then(function(data) {
      res.send(data);
    });
});
//--------------- filter to single image each artifact data--------//
function JsonSingleImage(params, Arttribute) {
  var newArray = [];
  var isExist = true;
  params.forEach(function(data) {
    isExist = true;
    if (data[Arttribute] !== "NaN") {
      newArray.forEach(function(obj) {
        if (obj[Arttribute] == data[Arttribute]) {
          isExist = false;
        }
      });
      if (isExist) {
        newArray.push(data);
      }
    }
  });

  return newArray;
}
//--------------- get all front cover artifact Image -------------------------

router.get("/image-single", function(req, res) {
  db.select()
    .from("ArtifactImage")
    .then(function(data) {
      var newArray = JsonSingleImage(data, "Artifact_ArtifactID");
      res.send(newArray);
    });
});
//--------------- get a single artifact page -------------------------
router.get("/photo/:id", function(req, res) {
  db.select()
    .from("Artifact")
    .where({ ArtifactID: req.params.id })
    .then(function(data) {
      res.send(data);
    });
});

//--------------- get artifact page comment -------------------------
router.get("/comment/:id", function(req, res) {
  db.select()
    .from("Comment")
    .where({ Artifact_ArtifactID: req.params.id })
    .then(function(data) {
      res.json(data);
    });
});

router.put("/edit/:id", function(req, res) {
  var obj = req.body;

  // convert tags 
  var tag = obj.tags;
  var new_tag_form =  [];
  for(var i = 0 ; i < tag.length; i ++){
    var temp = tag[i].id 
    var temp_split = temp.split(":")
    var temp_second_val = temp_split[1];
    var temp_second_val_trim = temp_second_val.trim()
   
    new_tag_form.push(temp_second_val_trim);
  }
  

  //location changes?


  var location ;
  if(obj.new_location.length > 0){
    location = obj.new_location

  }else{
    location = obj.location[0];
  }
  

  db('Artifact')
    .where({  ArtifactID : req.params.id})
    .update({

      Name : obj.title,
      Geotag :location,
      DateAcquireDay : obj.day,
      DateAcquireMonth: obj.month,
      DateAcquireYear : obj.year,
      AccuracyAcquire : obj.accuracy,
      description : obj.description,
      CurrentOwner: obj.current_owner[0],
      Tags : new_tag_form.toString()

    })
    .then(function(data) {
        res.send("success");
    });
  
  
});

module.exports = router;
