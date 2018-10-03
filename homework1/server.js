/*
Arie Williams
Oct 1 2018
*/

const express = require('express');
const app = express();
const port = 3000;
const people = require('./names.json');

/* People Getter, just returns all the People*/
app.get('/people', function(req, rec) {
  rec.status(200).json(people);
});

/* Getting the people with the specific ID's*/
app.get('/people/:id', function(req, rec) {
  if ( people.find( x => x.workID === req.params.id)) {
    rec.status(200).json(people.find( x => x.workID === req.params.id));

  }
  rec.status(404).send("Error: No persons with this ID: ");
})

/* Returning the people with the given ID's name */
app.get('/people/:id/name', function (req, rec) {
  if (people.find(x => x.workID === req.params.id)) {
    var firstName = people.find(x => x.workID === req.params.id).firstName;
    var lastName = people.find(x => x.workID === req.params.id).lastName;
    rec.status(200).json({ "Full Name": firstName + " " + lastName });
  }
  rec.status(404).send("Error: Person's names could not be found : ");
})

/*Retrieving the date information for number of years a person is in a company*/
app.get('/people/:id/years', function (req, rec) {
  if (people.find(x => x.workID === req.params.id)) {
    var today = new Date();
    var startDate = new Date(people.find(x => x.workID === req.params.id).startDate);
    var duration = today.getYear() - startDate.getYear();
    rec.status(200).json({ "Years worked ": duration });
  }
  rec.status(404).send("Error: No duration found for :");
})

/* Original Server serveup commands*/

app.get('/', (req, rec) => rec.send('Hello World!'));

app.get('*', function (req, rec) {
  rec.status(404).send("404: Page not found : ");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
