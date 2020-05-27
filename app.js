const express = require('express')
const app = express()

const router = require('./router')

// tells express to add user submitted data onto the request obj 
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// making the 'public' folder accessible 
app.use(express.static('public'))
// configures from which folder to get the view layer??
//1st arg needs to be 'views' exactly, 2nd arg is the folder name
app.set('views', 'views')
// this is where we tell express what template engine we're using 
app.set('view engine', 'ejs')

// setting the base path -- 1sr arg is the path, 2nd arg is what router to use 
app.use('/', router)

module.exports = app