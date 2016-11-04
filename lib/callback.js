'use strict';

const load = require('./load')();

const _callback = (err, data, list) =>{
	load.stop();
	if(!err) console.log("Backup", serverBackup.name ,"\nLogs:"+ data +"\nSTATUS ===================> OK");
	if(err) console.log("Backup", serverBackup.name ,"\nLogs:"+ data +"\nSTATUS ===================> FAIL");
	exec(list);
};

module.exports = _callback;
