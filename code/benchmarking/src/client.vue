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
			<h4 class="title is-4">Connect to a JIFF party</h4>
			<b-field label="Jiff server">
				<b-input v-model="newParty.jiffServer"></b-input>
			</b-field>
			<b-field label="Computation type">
				<b-select v-model="newParty.type" placeholder="Select a name">
					<option
						v-for="(computationType, key) in computationTypes"
						:value="computationType"
						:key="key">
						{{ computationType }}
					</option>
				</b-select>
			</b-field>
			<b-field grouped>
				<b-field label="Computation ID">
					<b-input v-model="newParty.computationId"></b-input>
				</b-field>

				<b-field label="Maximally allowed value (Zp)">
					<b-input v-model="newParty.zp" ></b-input>
				</b-field>

				<b-field label="Party Count" >
					<b-input v-model="newParty.partyCount"></b-input>
				</b-field>
			</b-field>
			<b-button type="is-primary" v-on:click="connect" :disabled="!inputValid">Connect to party</b-button>
			<p v-if="inputHint !== undefined" class="has-text-danger">{{inputHint}}</p>
		</div>
		<hr/>

		<div class="box">
			<h4 class="title is-4">Parties</h4>
			<p v-if="parties.length == 0">use the above form to connect to parties...</p>
			<b-collapse
				class="card"
				animation="slide"
				v-for="(party, key) of parties"
				:key="key"
				:open="expandedParty == key"
				@open="expandedParty = key">
				<div
					slot="trigger"
					slot-scope="props"
					class="card-header"
					role="button">
					<p class="card-header-title">
						{{ party.computationId }}
					</p>
					
					<p class="card-header-icon">
						<b-button size="is-small" type="is-danger" v-on:click.stop="removeParty(key)">Remove</b-button>
					</p>
				</div>
				<div class="card-content">
					<Party :parameters="party"/>
					<div class="content">
						{{ parties.text }}
					</div>
				</div>
			</b-collapse>
		</div>
	</div>
</template>

<script>
import Party from './party.vue'

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

const partyDefaults = {
	type: 'ranking', 
	computationId: 'test',
	zp: 11,
	partyCount: 2,
	jiffServer: getHostname()
}

export default {
	data: function() {
		return {
			computationTypes: [
				'ranking'
			],
			nextPartyKey: 0,
			
			newParty: { 
				...partyDefaults
			},

			value: undefined, 
			computing: false, 
			runtime: undefined, 
			output: [],

			inputHint: undefined, 

			//accordion
			expandedParty: 0,
			parties: {
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
		connect: function(event) {
			let parameters = this.parseInput()
			console.log(parameters)
			if (parameters !== undefined) {
				this.expandedParty = this.nextPartyKey
				this.parties[this.nextPartyKey++] = parameters
				this.newParty = {
					...partyDefaults
				}
				this.newParty.computationId += "" + (this.nextPartyKey)
			}
		},
		parseInput: function() {
			this.inputHint = undefined
			for(let input of [
					this.newParty.partyCount, 
					this.newParty.zp, 
					this.newParty.computationId
				]) {
				if(input == '') {
					this.inputHint = "no field may be empty"
					return undefined
				}
			}
			let partyCount = parseInt(Number(this.newParty.partyCount))
			let zp = parseInt(Number(this.newParty.zp))
			let computationId = this.newParty.computationId
			for(let key in this.parties) {
				let party = this.parties[key]
				console.log("checking party ", party) 
				if(party.computationId == computationId) {
					this.inputHint = "you cannot participate in the same party twice"
					return undefined
				}
			}
			if (!isNaN(partyCount) && !isNaN(zp)) {
				return {
					jiffServer: this.newParty.jiffServer,
					computationId,
					zp,
					partyCount
				}
			} else {
				this.inputHint = "party count and zp must be integers" 
				return undefined
			}			
		},
		removeParty: function(key) {
			this.$delete(this.parties, key)
		}
	},
	components: {
		Party
	}
}
</script>

<style lang="scss">
</style>
