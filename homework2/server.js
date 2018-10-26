/*
Arie Williams
Oct 22 2018
*/
var fs = require('fs');
var path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const people = require('./names.json');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*Defines the comment file as a variable so we can read from it*/
var COMMENTS_FILE = path.join(__dirname, 'names.json');

app.use(express.static("."));

/* People Getter, just returns all the People*/
app.get('/people', function(req, rec) {
  rec.status(200).json(people);
});
/*This is the app.post function for the ajax database post request*/

app.post('/people', function(req, res){
  fs.readFile(COMMENTS_FILE, function(err, data){
    if (err){
      console.error(err);
      process.exit(1);
    }

    var peeps = JSON.parse(data);
    var newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      workId: req.body.workID,
      startDate: req.body.stDate
    };

    comments.push(newPerson);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(peeps, null, 4), function(err) {
      if (err) {
        console.console.error(err);
        process.exit(1);
      }
      res.json(peeps);
    });
  });
});

/*This is getter that pulls the json data requested based on the id pf the perosn being req*/
/* Getting the people with the specific ID's*/
app.get('/person/:id', function(req, rec) {
  if ( people.find( x => x.workID === req.params.id)) {
  var person = {
    firstName: people.find( x => x.workID === req.params.id).firstName,
    lastName: people.find( x => x.workID === req.params.id).lastName,
    workID: people.find( x => x.workID === req.params.id).workID,
    startDate: people.find( x => x.workID === req.params.id).startDate
  };
    rec.status(200).send({"msg": person});

  }
  else {rec.status(404).send("Error: No persons with this ID: ");}
})

// This is the updating of a person, we use the put command to do updates in js
// curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"Jonah","lastName":"Oji","loginID":"jOjo","startDate":"2010/04/12"}' http://localhost:3000/person/jOji
app.put('/person/:id', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        var peeps = JSON.parse(data);

        for (const person of peeps) {
            if (person["loginID"] == req.params.id) {
                person.firstName = req.body.firstName;
                person.lastName = req.body.lastName;
                person.startDate = req.body.startDate;

                fs.writeFileSync(COMMENTS_FILE, JSON.stringify(peeps, null, 4),function(err) {
                  if (err) {
                    console.console.error(err);
                    process.exit(1);
                  }
                  res.json(peeps);
                });
              }
            }
          });
        });


// This the delete method it is removing a person from the given database
// curl -X DELETE http://localhost:3000/person/jOji
app.delete('/person/:id', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        var peeps = JSON.parse(data);

        for (let i = 0, len = peeps.length; i < len; i++) {
            if (peeps[i]["loginID"] == req.params.id) {
                let person = peeps[i];

                // DELETE this person
                peeps.splice(i, 1);
                fs.writeFileSync(COMMENTS_FILE, JSON.stringify(peeps, null, 4), function(err) {
                  if (err) {
                    console.console.error(err);
                    process.exit(1);
                  }
                  res.json(peeps);
            });
        }
      }
    });
  });

/* Returning the people with the given ID's name */
app.get('/person/:id/name', function (req, rec) {
  if (people.find(x => x.workID === req.params.id)) {
    var firstName = people.find(x => x.workID === req.params.id).firstName;
    var lastName = people.find(x => x.workID === req.params.id).lastName;
    rec.status(200).json({ "Full Name": firstName + " " + lastName });
  }
  else {rec.status(404).send("Error: Person's names could not be found : ");}
})

/*Retrieving the date information for number of years a person is in a company*/
app.get('/person/:id/years', function (req, rec) {
  if (people.find(x => x.workID === req.params.id)) {
    var today = new Date();
    var startDate = new Date(people.find(x => x.workID === req.params.id).startDate);
    var duration = today.getYear() - startDate.getYear();
    rec.status(200).json({ "Years worked ": duration });
  }
  else {rec.status(404).send("Error: No duration found for :");}
})

/* Original Server serveup commands*/

app.get('/', (req, rec) => rec.send('Hello World!'));

app.get('*', function (req, rec) {
  rec.status(404).send("404: Page not found : ");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
