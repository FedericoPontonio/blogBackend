const express = require('express');
require('dotenv').config();
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);

app.listen(process.env.PORT || 3000)