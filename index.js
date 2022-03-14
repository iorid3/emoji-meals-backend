const express = require('express');
const app = express();
const mongoose = require('mongoose');
const recepieRouter = require('./routes/moji')
const config = require('./config')

app.use(express.json())

mongoose.connect(config.MONGOODB_URL, (err) => {
  if(err) return console.log(err)

  console.log('connected to db successfully')
})

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



app.use(recepieRouter)
app.listen(process.env.PORT || 3001, () => {
  console.log('serving running on 3001')
})