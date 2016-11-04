'use strict';

const load = require('./load')();
const request = require('./request');

const exec = (lista) =>{
	
	let lista_aux = lista;
	
	if(Array.isArray(lista_aux) && lista_aux.length) {
		
		const serverBackup = lista_aux.pop();
		
		const callback = (err, data) =>{
			load.stop();

			if(!err) console.log(
				"\n Name: \t\t\t\t", serverBackup.name,
				"\n Host: \t\t\t\t", serverBackup.host,
				"\n Path: \t\t\t\t", serverBackup.path,
				"\n Status: \t\t\t", "OK",
				"\n Logs: \t\t\t", data,
				"\n ============================================================= "
			);

			if(err) console.log(
				"\n Name: \t\t\t\t", serverBackup.name,
				"\n Host: \t\t\t\t", serverBackup.host,
				"\n Path: \t\t\t\t", serverBackup.path,
				"\n Status: \t\t\t", "FAIL",
				"\n Logs: \t\t\t", data,
				"\n ============================================================= "
			);

			load.stop();
				
			exec(lista_aux);
		};

		load.create('Executando backup ', serverBackup.name).start();

		request(serverBackup, callback);
	}else{
		try{
		  load.stop();
		}catch(e){}
	}
};

module.exports = exec;