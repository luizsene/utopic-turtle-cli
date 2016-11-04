'use strict';

const servidores = require('./servidores')();

const _host = (h) =>{
	let host;
	servidores.map((s)=>{
		if(s.name === h) host = s;
	});
	console.log("Host: ", host);
	return host;
};

module.exports = _host;