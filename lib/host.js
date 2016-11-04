'use strict';

const servidores = require('./servidores')();
const exec = require('./exec');

const _host = (h) =>{
	let host;
	servidores.map((s)=>{
		if(s.name === h) host = s;
	});

	exec([host]);
};

module.exports = _host;