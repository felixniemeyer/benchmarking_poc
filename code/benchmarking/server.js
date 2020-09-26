var path = require('path')
var express = require('express')
var http = require('http')

//Serve static files
let app = express();
app.use('/', express.static(path.join(__dirname, 'dist')))

server = http.Server(app) 

// Start jiff server
var JIFFServer = require('../../../jiff/lib/jiff-server.js')
new JIFFServer(server, { logs: true });

server.listen(8080, function() {
	console.log("listening on *:8080")
})


// info
console.log('Direct your browser to http://localhost:8080/client.html.')
console.log('To run a node.js based party: node party <input> \n')
