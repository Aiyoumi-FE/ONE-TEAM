import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import config from './configs';

const app = new koa();
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const controller = require('./controller');

var User = require("./models/user.js");

app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(bodyParser());
app.use(controller());
// response
// app.use(ctx => {
//   ctx.response.type = 'html';
//   console.log(__dirname)
//   ctx.response.body = fs.createReadStream(path.join(__dirname, '..', '/client/index.html'));
// });

app.on('error', function(err, ctx) {
  console.log(err);
});

app.listen(config.dev.port, () => {
  console.log('The server is running at http://localhost:' + config.dev.port)
});
