/*
Arie Williams
Oct 10 2018
Lab6
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/request', function (req, res) {
  res.send(req.body;
})

app.head('/request', function (req,res) {
  res.send(req.body);
});

app.post('/request', function (req, res) {
  res.send(req.body);
});

app.put('/request', function (req, res) {

  res.send(req.body);
});

app.delete('/request', function (req, res) {
  res.send(req.body);
});

app.all('*', function (re, res){
  if (req.url == '/request'){
    res.status(200);
  }
  else {
    res.status(404);
    res.send("Error: Page not found");
  }
});

app.listen(port, function(res, req) {
  console.log("Server is listen for request on port ${port}!");
});
