/**
 * Created by summer on 16/12/26.
 */
// var express = require('express');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

let app = express();
let router = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/', (req, res, next) => {
  res.end('Hello World and Gulp!');
});

app.use('/', router);

app.listen(3000, () => {
  console.log('server listening at port 3000...');
});