'use strict';

const load = require('./load')();

const print_info = (s) => {
	console.log(
		" Name: \t\t\t\t", s.name,
		"\n Host: \t\t\t\t", s.host,
		"\n Path: \t\t\t\t", s.path,
		"\n User FTP: \t\t\t", s.user_ftp,
		"\n Password FTP: \t\t\t", s.pass_ftp,
		"\n Backup Frequence: \t\t", s.frequence,
		"\n ============================================================= "
	);
}

module.exports = print_info;