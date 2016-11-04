'use strict';

const servidores = require('./servidores')();
const exec = require('./exec');

const _semanal = () =>{
  const servidores_semanais = [];

  servidores.map((s)=>{
    if(s.frequence === 's') servidores_semanais.push(s);
  });

 exec(servidores_semanais)
};

module.exports = _semanal;
