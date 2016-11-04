'use strict';

const servidores = require('./servidores')();

const _mensal = () =>{
  const servidores_mensais = [];
  servidores.map((s)=>{
    if(s.frequence === 'm') servidores_mensais.push(s);
  });
 console.log('Servidores Mensais: ', servidores_mensais);
 return servidores_mensais;
};

module.exports = _mensal;
