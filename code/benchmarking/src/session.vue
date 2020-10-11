<template>
	<div class="session content has-background-color-dark">

	<div class="columns">
		<div class="column">
			<b-field :label="`Provide your value (between 0 and ${parameters.zp})`">
				<b-input 
					v-model="value" 
					type="number"
					min="0"
					:max="parameters.zp"></b-input>
			</b-field>
			<b-button type="is-primary" :disabled="!connected || startTime !== undefined" v-on:click="submit">Rank me!</b-button>
		</div>
		<div class="column log has-background-white-ter">
			<p v-for="(line, i) in log" :key="i" v-bind:class="['logLine', line.cssClass]">{{line.msg}}</p>
			<p v-if="runtime !== undefined" class="logLine has-text-info">Seconds elapsed: {{ runtime / 1000 }}</p>
		</div>
	</div>	
	</div>
</template>

<script>
import mpc from "../mpc.js"

export default {
	data: function() {
		return {
			connected: false, 
			value: undefined, 
			startTime: undefined, 
			runtime: undefined, 
			log: [],
		}
	}, 
	props: {
		parameters: Object
	},
	created: function() {
		console.log('parameters', this.parameters)
		this.connect()
	},
	methods: {
		logInfo: function(msg) {
			this.log.push( { msg, cssClass: "has-text-info" } )
		},
		logError: function(msg) {
			this.log.push( { msg, cssClass: "has-text-danger" } )
		},
		logSuccess: function(msg) {
			this.log.push( { msg, cssClass: "has-text-success" } )
		},
		connect: function(event) {
			let options = { 
				party_count: this.parameters.partyCount, 
				Zp: this.parameters.zp
			}
			options.onError = (_, error) => { 
				this.logError("Jiff server error: " + error) 
			}
			options.onConnect = () => {
				this.connected = true
				this.logInfo("All parties Connected")
			}
			console.log(this.parameters.jiffServer) 
			mpc.connect(this.parameters.jiffServer, this.parameters.computationId, options)
			this.logInfo("Connecting & waiting for peers to connect...") 
		},
		submit: function() {
			let value = parseInt(Number(this.value))

			if (isNaN(value)) {
				this.logError("Input a valid number!")
			} else if (this.parameters.zp < value || value < 0 || value !== Math.floor(value)) {
				this.logError(`Input a WHOLE number between 0 and ${this.parameters.zp}!`)
			} else {
				this.logInfo('Waiting for others & starting computation...')
				this.startTime = Date.now()
				mpc.computeCompare(value)
					.then(this.handleResult)
					.catch(err => this.logError(err))
			}
		},
		handleResult: function(result) {
			let filtered = result.filter(el => el != null)
			this.logSuccess("Result is: " + filtered)
			this.runtime = Date.now() - this.startTime
		}
	}
}
</script>

<style lang="scss">

.content .logLine:not(:last-child), 
.logLine, {
	margin: 0px;
	font-family: monospace; 
}
</style>
