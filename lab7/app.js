/*
Arie Williams
Oct. 17 2018
Cs336 Lab3 */

const express = require('express');
const app = express();
const port = 3000

app.use(express.static('public'))

//express.static('', [options])

app.get('/', function(req, res){
    res.sendfile('lab07.html', { root: __dirname + "/public" } );
});

app.get('/hello', function(req,res){
  res.send({"content" : "Hello Lab7, it's me Arie!!"});
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
