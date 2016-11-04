'use strict';

const Spinner = require('cli-spinner').Spinner;

const load = () =>{

	let spinner;

	const create = (msg, name) =>{
		spinner = new Spinner(msg + '  ', name +' -------------> %s');
		spinner.setSpinnerString('|/-\\');
		return spinner;
	}
	
	const start = (instance) =>{
		spinner = instance || spinner;
		spinner.start();
	}

	const stop = (instance) =>{
		spinner = instance || spinner;
		spinner.stop();
	}

	return {
		create,
		start,
		stop
	}
};

module.exports = load;
