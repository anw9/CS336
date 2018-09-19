/* 
Arie Williams 
Sept. 12 2018 
Cs336 Lab3 */

const express = require('express')
const app = express()
const port = 3000


//express.static('', [options])
app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//3.1
/*
A) Express.js is a node framework it makes it easier to set up and work with a node with
built-in methods that route faster and simplier. It is made for creating web applications
and is based off of node's approaches.
Node.js is a platform for building the server side of a application
so it is more I/O event-driven 

B) This file holds metadata relevant to the project, it is used to give information to 
NPM that ID and handeles the dependicies
*/

//3.2
/*
A) The files are static because they are unchanged from the original view of them
on a webpage even after a user modifies them on the webpage itself, the information is 
always returned unchanged. This file doesn't have to be generated or compressed always delievers the
same thing.
*/

//3.3


