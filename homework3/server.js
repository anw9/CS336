/*
Arie Williams
Oct 22 2018
*/
var fs = require('fs');
var path = require('path');
const express = require('express');
const app = express();
const port = 3000;
assert = require('assert');
const bodyParser = require('body-parser');
//Adding Mongo elements
var db;
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*Defines the comment file as a variable so we can read from it*/
var COMMENTS_FILE = path.join(__dirname, 'names.json');
//Serving from the public folder
app.use(express.static("public"));
app.use('/', express.static(path.join(__dirname, 'public')));

/* People Getter, just returns all the People*/
app.get('/people', function(req, rec) {
  //Chaning to access mongoDB
  db.collection('people').find().toArray(function (err, result){
    assert.equal(null, err);

    rec.json(result);
  });
});

/*This is the app.post function for the ajax database post request*/
app.post('/people', function(req, res){
  db.collection('people').insertOne(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            workID: req.body.workID,
            startDate: req.body.startDate

        },
        function(err, r) {
          assert.equal(null, err);
        }
    );
});

/*This is getter that pulls the json data requested based on the id pf the perosn being req*/
/* Getting the people with the specific ID's*/
app.get('/person/:id', function(req, rec) {
  db.collection('people').find().toArray(function (err, result) {
         assert.equal(null, err);

         for (const person of result) {
             if (person["workID"] == req.params.id) {
                 rec.json(person);
                 return;
             }
         }
     });
});

// This is the updating of a person, we use the put command to do updates in js
// curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"Jonah","lastName":"Oji","workId":"jOjo","startDate":"2010/04/12"}' http://localhost:3000/person/jOji
app.put('/person/:id', function(req, res) {
  db.collection('people').updateOne({workID: req.params.id},
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      workID: req.body.workID,
      startDate: req.body.startDate
    },
    function(err, result) {
      assert.equal(null, err);
      res.json("Updated data for ID: " + req.params.id);
      return;
    }
  );
});


// This the delete method it is removing a person from the given database
// curl -X DELETE http://localhost:3000/person/jOji
app.delete('/person/:id', function(req, res) {
  db.collection('people').deleteOne({workID: req.params.id}, function(err, result) {
       assert.equal(null, err);
       res.json("Deleted person with ID: " + req.params.id);
       return;
   });
  });

/* Returning the people with the given ID's name */
app.get('/person/:id/name', function (req, rec) {

  db.collection('people').find().toArray(function (err, result) {
    assert.equal(null, err);
    for (const person of result) {
      if (person["workID"] == req.params.id) {
        rec.json('${person.firstName} ${person.lastName}');
        return;
      }
    }
  });

});

/*Retrieving the date information for number of years a person is in a company*/
app.get('/person/:id/years', function (req, rec) {

db.collection('people').find().toArray(function (err, result) {
  assert.equal(null, err);
  for (const person of result) {
    if (person["workID"] == req.params.id) {
      var today = new Date();
      var startDate = new Date(person.startDate);
      var age = today.getFullYear() - startDate.getFullYear();

      rec.send('Years in organization: ${age}');
      return;
    }
  }
});

});

/* Connecting to Mongo servers for the data*/
MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds045087.mlab.com:45087/cs336', function (err, client) {
  if (err) throw err

  db = client;

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));

  db.collection('people').find().toArray(function (err, result) {
    if (err) throw err
  });
});
