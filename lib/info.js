'use strict';

const servidores = require('./servidores')();


const _info = (i) =>{
	let host;
	servidores.map((s) => s.name === i ? host = s : null);
	if(host) require('./print')(host);
	else console.log('Host %s not found', i);
};

module.exports = _info;