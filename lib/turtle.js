'use strict';

const commander = require('commander');
const pkg = require('../package.json');
const APIget = require('./api');

commander
	.version('Utopic Turtle ' + pkg.version)
	.option('-s, --semanal', 'Backup semanal')
	.option('-m --mensal', 'Backup mensal')
	.option('-t, --todos', 'Backup de todos')
	.option('-l, --list', 'Lista todos os hosts disponíveis')
	.option('-i --info <hostname>', 'Informações de um host expecífico')
	.option('-n, --host <hostname>', 'Backup host expecífico')


commander
	.command('run')
	.description('Executa um comando')
	.action(()=>{
	   if(commander && (commander.semanal || commander.mensal || commander.todos || commander.list || commander.info || commander.host))
              APIget(commander.semanal, commander.mensal, commander.todos, commander.list, commander.info, commander.host);
     	   else
	     console.log("Flag ausente [-s, -m, -t, -l, -i ou -n]: run `turtle --help` para mais informações.");
	});


commander
	.parse(process.argv);
