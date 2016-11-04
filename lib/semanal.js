'use strict';

const servidores = require('./servidores')();

const _semanal = () =>{
  const servidores_semanais = [];
  servidores.map((s)=>{
    if(s.frequence === 's') servidores_semanais.push(s);
  });
 console.log('Servidores Semanais: ', servidores_semanais);
 return servidores_semanais;
};

module.exports = _semanal;
