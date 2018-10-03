/*
Arie Williams
Lab 4

Challenge 1. The font-weight is bolder, and the color property as red

Challenge 2.
*/

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
//express.static('', [options])
app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
