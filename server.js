const express = require('express')
var bodyParser = require('body-parser')
require('dotenv').config()

const dbConfig = require('./database/dbconfig')
const app = express();

const port = process.env.PORT || 8080


//database connection
dbConfig.db()

// create application/json parser
var jsonParser = bodyParser.json()
app.use(express.urlencoded({extended:true})) //this middleware helps to get datas that are sent with the request andpare in req.body
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// declaring the engine
app.set('view engine','ejs')
app.use(express.json())

// creating the static files
app.use(express.static('public'))

//displaying the url
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// creating the route group using prefix
const homeRoute = require('./route/homeRoute')
const fileRoute = require('./route/fileRoute')
app.use('/',homeRoute)
app.use('/files',fileRoute)