const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const Datastore = require('nedb')
const db = new Datastore()
const bodyParser = require('body-parser')

const app = new express()
const port = process.env.PORT || 3000

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({
  extended: true
}));

//db.insert([{ text: 'Doing something' }]) 

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post("/fetch-todos", function(req, res) {
  db.find({}, function(err, docs) {
    res.send(docs.map(function(doc) { return { id: doc._id, text: doc.text }}))
  })
})

app.post("/add-todo", function(req, res) {
  db.insert([{ text: req.body.text }], function (err, newDocs) {
    res.send(newDocs[0])
  });
})

app.post("/edit-todo", function(req, res) {
  db.update({ _id: req.body.id }, {text: req.body.text}, { returnUpdatedDocs: true },  function (err, numAffected, doc, upsert) {
    
    res.send({ text: doc.text, id: doc._id })
  });
})

app.post("/complete-todo", function(req, res) {
  db.findOne({ _id: req.body.id }, function (err, doc) {
    db.update({ _id: req.body.id }, {completed: !doc.completed}, { returnUpdatedDocs: true },  function (err, numAffected, doc, upsert) { 
      res.send({ text: doc.text, id: doc._id, completed: doc.completed })
    })
  })
})

app.post("/complete-all", function(req, res) {
  db.find({ }, function (err, docs) {
    const areAllMarked = docs.every(todo => todo.completed)

    db.update({ }, {completed: !areAllMarked}, { returnUpdatedDocs: true }, function (err, numAffected, doc, upsert) { 
      res.send({ })
    })
  })
})

app.post("/clear-completed", function(req, res) {
  db.remove({ completed: true }, { multi: true }, function (err, numRemoved) {
    res.send(numRemoved);
  });
})

app.post("/delete-todo", function(req, res) {
  db.remove({ _id: req.body.id }, function (err, numRemoved) {
    res.send({ })
  });
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> Listening on port %s", port, port)
  }
})
