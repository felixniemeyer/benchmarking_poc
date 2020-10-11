<template>
	<div class="client container">
		<section class="hero">
			<div class="hero-body">
				<h1 class="title">
					Benchmarking MPC
				</h1>
				<h2 class="subtitle">
					proof of concept
				</h2>
			</div>
		</section>

		<div class="box">
			<b-tabs position="is-centered" class="block">
				<b-tab-item label="Join session">
					<Joiner
						v-on:join="joinSession"
						/>
				</b-tab-item>
				<b-tab-item label="Create session">
					<Builder
						v-bind:sessionConfig="newSessionConfig"
						v-on:create="createSession"
						/>
				</b-tab-item>
			</b-tabs>
			<p v-if="inputHint !== undefined" class="has-text-danger">{{inputHint}}</p>
		</div>
		<hr/>

		<div class="box">
			<h4 class="title is-4">Sessions</h4>
			<p v-if="sessions.length == 0">use the above form to connect to sessions...</p>
			<b-collapse
				class="card"
				animation="slide"
				v-for="(session, key) of sessions"
				:key="key"
				:open="expandedSession == key"
				@open="expandedSession = key">
				<div
					slot="trigger"
					slot-scope="props"
					class="card-header"
					role="button">
					<p class="card-header-title">
						{{ session.computationId }}
					</p>
					
					<p class="card-header-icon">
						<b-button size="is-small" type="is-danger" v-on:click.stop="removeSession(key)">Remove</b-button>
					</p>
				</div>
				<div class="card-content">
					<Session :parameters="session"/>
					<div class="content">
						{{ sessions.text }}
					</div>
				</div>
			</b-collapse>
		</div>
	</div>
</template>

<script>
import Builder from './builder.vue'
import Joiner from './joiner.vue'
import Session from './session.vue'

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

const sessionDefaults = {
	inputs: [
	],
	computations: [
	]
	/*
	type: 'ranking', 
	computationId: 'test',
	zp: 11,
	partyCount: 2,
	jiffServer: getHostname() */
}

export default {
	data: function() {
		return {
			nextSessionKey: 0,
			
			newSessionConfig: { 
				...sessionDefaults
			},

			value: undefined, 
			computing: false, 
			runtime: undefined, 
			output: [],

			inputHint: undefined, 

			//accordion
			expandedSession: 0,
			sessions: {
			}
		}
	}, 
	created: function() {
	},
	computed: {
		inputValid: function() { //TODO: something is broken
			return this.parseInput() !== undefined
		}
	},
	methods: {
		createSession: function(event) {
			//TODO: the idea of having 1 person create the party and x other persons join the session requires some work on the "server" side (may as well be implemented p2p immediately). A "sessionConfig" has to be passed around. 
			let parameters = this.parseInput()
			console.log(parameters)
			if (parameters !== undefined) {
				this.expandedSession = this.nextSessionKey
				this.sessions[this.nextSessionKey++] = parameters
				this.newSessionConfig = {
					...sessionDefaults
				}
				this.newSessionConfig.computationId += "" + (this.nextSessionKey)
			}
		},
		joinSession: function(joinInfo) {
			//TODO: implement
		},
		parseInput: function() {
			this.inputHint = undefined
			for(let input of [
					this.newSessionConfig.partyCount, 
					this.newSessionConfig.zp, 
					this.newSessionConfig.computationId
				]) {
				if(input == '') {
					this.inputHint = "no field may be empty"
					return undefined
				}
			}
			let partyCount = parseInt(Number(this.newSessionConfig.partyCount))
			let zp = parseInt(Number(this.newSessionConfig.zp))
			let computationId = this.newSessionConfig.computationId
			for(let key in this.sessions) {
				let session = this.sessions[key]
				console.log("checking session", session) 
				if(session.computationId == computationId) {
					this.inputHint = "you cannot participate in the same session twice"
					return undefined
				}
			}
			if (!isNaN(partyCount) && !isNaN(zp)) {
				return {
					jiffServer: this.newSessionConfig.jiffServer,
					computationId,
					zp,
					partyCount
				}
			} else {
				this.inputHint = "party count and zp must be integers" 
				return undefined
			}			
		},
		removeSession: function(key) {
			this.$delete(this.sessions, key)
		}
	},
	components: {
		Session,
		Builder,
		Joiner,
	}
}
</script>

<style lang="scss">
</style>
