'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const api = require('./routes/api');

const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const app = express();

// global middleware
app.use(express.static('./public'));
app.use('/docs', express.static('./docs'));
app.use(express.json()); //body-parser to add body to the req
app.use(morgan('dev'));
app.use(cors());

app.use('', api);

app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
