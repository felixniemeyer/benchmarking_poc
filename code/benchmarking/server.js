const path = require('path')
const express = require('express')
const http = require('http')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultOption: 8080 }, 
  { name: 'help', alias: 'h', type: Boolean }, 
]

function printUsage() { 
  console.log(commandLineUsage({
    header: "Usage",
    optionList: optionDefinitions
  }))
}

function runServers() {
  //Serve static files
  let app = express();
  app.use('/', express.static(path.join(__dirname, 'dist')))

  server = http.Server(app) 

  // Start jiff server
  var JIFFServer = require('../../../jiff/lib/jiff-server.js')
  new JIFFServer(server, { logs: true });

  server.listen(options.port, function() {
    console.log(`listening on ${options.port}`)
  })

  // info
  console.log(`Direct your browser to http://localhost:${options.port}/client.html.`)
  console.log('To run a node.js based party: node party <input> \n')
}

let options
try {
  options = commandLineArgs(optionDefinitions)
  if(options.help) {
    printUsage()
  } else {
    runServers()
  }
  
} catch(e) {
  console.log("failed to parse arguments: ", e.toString() ) 
  printUsage()
}

