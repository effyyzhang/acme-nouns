const app = require('express').Router();
const db = require('./db');
const {Person, Place, Thing} = db.model;
app.get('/people', (req, res, next) => {
   Person.findAll()
   .then( people => res.send(people))
   .catch(next)
})

app.get('/places', (req, res, next) => {
    Place.findAll()
    .then( places => res.send(places))
    .catch(next)
 })

 app.get('/things', (req, res, next) => {
    Thing.findAll()
    .then( things => res.send(things))
    .catch(next)
 })

module.exports = app;
