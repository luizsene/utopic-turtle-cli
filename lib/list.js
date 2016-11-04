'use strict';

const servidores = require('./servidores')();

const _list = () =>{
	console.log(" =============================================================");
	const lista = servidores.map((s)=>{
		require('./print')(s);
	});
};

module.exports = _list;