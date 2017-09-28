// 保证之后的es6语法可用
require("babel-core/register")({
  presets: ['es2015', 'stage-0']
});
require("babel-polyfill");
//
module.exports = require('./index.js');
