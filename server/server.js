const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const cors =require('cors')
const path = require('path')
const controller = require('./controller')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/build'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }))

  massive(process.env.CONNECTION_STRING)
  .then(db=>{
      console.log('db Connected')
      app.set("db", db)
  })
  .catch(err => console.log(err))

app.post('/api/add-player', controller.addPlayer)

  const port = process.env.SERVER_PORT || 3002

  app.listen(port, () => {
      console.log(`Server listening at localhost:${port}`);
  }); 