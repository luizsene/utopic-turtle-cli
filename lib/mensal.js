'use strict';

const servidores = require('./servidores')();
const exec = require('./exec');

const _mensal = () =>{
  const servidores_mensais = [];
  
  servidores.map((s)=>{
    if(s.frequence === 'm') servidores_mensais.push(s);
  });

  exec(servidores_mensais);
};

module.exports = _mensal;
