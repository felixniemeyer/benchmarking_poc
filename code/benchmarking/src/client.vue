<template>
	<div class="client">

		<h1>Connect to JIFF</h1>
		Computation ID
		<input v-model="computationId">
		<br/><br/>
		Zp (defines max value to compare)
		<input v-model="zp">
		<br/><br/>
		Party Count 
		<input v-model="partyCount" pattern="[0-9]+"> 
		<button v-on:click="connect" :disabled="connected">Connect</button>
		<br/>

		connected!
		<hr/>
		<h1>Benchmarking each other under MPC</h1>
		Input Number (between 0 and 100)
		<input v-model="value" pattern="[0-9]+"> 
		<button v-on:click="submit" :disabled="!connected || computing">Rank me!</button><br/>

		<div>
			<h1>Output</h1>
			<p v-for="(line, i) in output" :key="i" v-bind:class="[line.type]">{{line.msg}}</p>
		</div>
		<div v-if="runtime">
			<h1>Runtime</h1>	
			<p>Seconds elapsed: {{runtime}}</p>
		</div>
	</div>
</template>

<script>
import mpc from "../mpc.js"

function getHostname() {
	let hostname = window.location.hostname.trim()
	let port = window.location.port
	if (port == null || port === '') {
		port = '80'
	}
	if (!(hostname.startsWith('http://') || hostname.startsWith('https://'))) {
		hostname = 'http://' + hostname
	}
	if (hostname.endsWith('/')) {
		hostname = hostname.substring(0, hostname.length-1)
	}
	if (hostname.indexOf(':') > -1 && hostname.lastIndexOf(':') > hostname.indexOf(':')) {
		hostname = hostname.substring(0, hostname.lastIndexOf(':'))
	}
	return hostname + ':' + port
}

export default {
	data: function() {
		return {
			connected: false, 
			computationId: 'test',
			zp: 11,
			partyCount: 2,
			value: undefined, 
			computing: false, 
			runtime: undefined, 
			output: []
		}
	}, 
	created: function() {
	},
	methods: {
		log: function(msg, type) {
			this.output.push( { msg, type: "info" } )
		},
		logError: function(msg, type) {
			this.output.push( { msg, type: "error" } )
		},
		connect: function(event) {
			this.output = [] // clear log

			let partyCount = parseInt(Number(this.partyCount))
			let zp = parseInt(Number(this.zp))

			if (isNaN(partyCount) || isNaN(zp)) {
				this.logError("Party count and Zp must be integers!")
			} else {
				let options = { party_count: partyCount, Zp: zp }
				options.onError = (_, error) => { 
					this.logError("Jiff server error: " + error) 
				}
				options.onConnect = () => {
					this.connected = true
					this.log("All parties Connected")
				}
				mpc.connect(getHostname(), this.computationId, options)
				this.log("Waiting for peers to connect") 
			}
		},
		submit: function() {
			let value = parseInt(Number(this.value))

			if (isNaN(value)) {
				this.logError("Input a valid number!")
			} else if (100 < value || value < 0 || value !== Math.floor(value)) {
				this.logError("Input a WHOLE number between 0 and 100!")
			} else {
				this.log('Waiting for others & starting computation...')
				this.computing = true
				this.startTime = Date.now()
				mpc.computeCompare(value)
					.then(this.handleResult)
					.catch(err => this.logError(err))
			}
		},
		handleResult: function(result) {
			let filtered = result.filter(el => el != null)
			this.log("Result is: " + filtered)
			this.runtime = Date.now() - this.start_time
			this.computing = false
		}
	}
}
</script>

<style lang="scss">
.error {
	color: #ff0000;
}
</style>
