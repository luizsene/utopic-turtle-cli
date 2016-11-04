'use stritc';

const Spinner = require('cli-spinner').Spinner;

const load = () =>{

	const create = (msg, name) =>{
		const spinner = new Spinner(msg + '  ', name +' -------------> %s');
		spinner.setSpinnerString('|/-\\');
		return spinner;
	}
	
	const start = (spinner) =>{
		if(spinner) spinner.start();
	}

	const stop = (spinner) =>{
		if(spinner) spinner.stop();
	}

	return {
		create,
		start,
		stop
	}
};

module.exports = load;
