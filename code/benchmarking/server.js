const path = require('path')
const express = require('express')
const http = require('http')
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const optionDefinitions = [
  { name: 'port', alias: 'p', type: Number, defaultValue: 8080 }, 
  { name: 'help', alias: 'h', type: Boolean }, 
]
let options

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
    console.log(`serving statically from dist`)
  })
}

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

