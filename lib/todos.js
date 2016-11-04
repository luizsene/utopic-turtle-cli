'use strict';

const servidores = require('./servidores')();

const _todos = () =>{
 console.log('Servidores Todos: ', servidores);
 return servidores;
};

module.exports = _todos;
