'use strict';

const servidores = require('./servidores')();
const exec = require('./exec');

const _todos = () =>{
  exec(servidores);
};

module.exports = _todos;
