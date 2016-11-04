'use strict';

const _api = (s,m,t,l,i,h) =>{
 if(s) require('./semanal')();
 if(m) require('./mensal')();
 if(t) require('./todos')();
 if(h) require('./host')(h);
 if(l) require('./list')();
 if(i) require('./info')(i);
};

module.exports = _api;
