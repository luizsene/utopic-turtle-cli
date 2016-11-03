'use strict';

const _api = (s,m,t,l,i,h) =>{
 let choose;
 if(s) choose = 'Semanal';
 if(m) choose = 'Mensal';
 if(t) choose = 'Todos';
 if(h) choose = 'Host ' +  h;
 if(l) choose = 'List';
 if(i) choose = 'Info: ' + i;

 console.log("Comando escolhido: ", choose);

 return choose;
};

module.exports = _api;
