const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
db.syncAndSeed()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });    
  });