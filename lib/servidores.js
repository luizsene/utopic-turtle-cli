'use strict';

const _servidores = () =>{
 return [
    {
    	name: 'test',
    	host: 'test.com.br',
    	path: '/index.php/backup.php',
    	user_ftp: 'user',
      pass_ftp: 'pass',
	    frequence: 'm'
  },

  {
      name: 'test2',
      host: 'test2.com.br',
      path: '/index.php/backup.php',
      user_ftp: 'user',
      pass_ftp: 'pass',
      frequence: 's'					
   }	
 ];
};

module.exports = _servidores;
