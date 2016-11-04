'use strict';

const http = require('http');
const fs = require('fs');

const _request = (server, callback) =>{

	let options = {
	  "method": "GET",
	  "hostname": server.host,
	  "port": null,
	  "path": server.path,
	  "headers": {
	    "cache-control": "no-cache"
	  }
	};

	var req = http.request(options, function (res) {
	  
	  var chunks = [];

	  // Buffer de dados
	  res.on("data", function (chunk) {
	    chunks.push(chunk);
	  });

	  // salva o log do arquivo de backup
	  res.on("end", function () {
	    var body = Buffer.concat(chunks);

	    const fileName = __dirname + '/../log/'+ server.name + "___" + Date.now() + '.txt';

		fs.writeFile(fileName, body.toString(), function(err) {
		    if(err) return console.log(err);
		}); 

		callback(null, fileName);

	  });

	  // Erro de requisição
	  res.on("error", function(err){
	  	console.log("err: ", err);
	  	callback(err, null);
	  })
	});

   req.end();

};

module.exports = _request; 


