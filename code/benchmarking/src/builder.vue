<template>
	<section>
		<b-field label="Party count" >
			<b-input v-model="sessionConfig.partyCount"></b-input>
		</b-field>

		<h1 class="title is-4">
			Inputs
		</h1>
		<InputConfig
			v-for="(input, key) of sessionConfig.inputs" 
			:key="'input'+key"
			
			/>
		<b-field>
			<b-button type="is-secondary" v-on:click="addInput">
				Add input
			</b-button>
		</b-field>

		<h1 class="title is-4">
			Computations
		</h1>
		<ComputationConfig
			v-for="(computation, key) of sessionConfig.computations" 
			:key="'computation'+key"
			v-bind:computationConfig="computation"
			/>
		<b-field>
			<b-button type="is-secondary" v-on:click="addComputation">
				Add computation
			</b-button>
		</b-field>

		<hr/>

		<pre v-if="showJSON" class="box">{{JSON.stringify(sessionConfig, null, 2)}}</pre>

		<b-field grouped>
			<b-field>
				<b-button type="is-primary" v-on:click="create">
					Create session
				</b-button>
			</b-field>
			<b-switch v-model="showJSON">Show session config JSON</b-switch>
		</b-field>
		
		<!-- Legacy config fields
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
			<b-field label="Pary ID">
				<b-input v-model="newParty.computationId"></b-input>
			</b-field>

			<b-field label="Maximally allowed value (Zp)">
				<b-input v-model="newParty.zp" ></b-input>
			</b-field>

			<b-field label="Party Count" >
				<b-input v-model="newParty.partyCount"></b-input>
			</b-field>
		</b-field> -->
	</section>
</template>

<script>
import InputConfig from './input-config.vue'
import ComputationConfig from './computation-config.vue'

export default {
	data: function() {
		return {
			showJSON: false
		}
	}, 
	props: {
		sessionConfig: Object	
	},
	created: function() {
	},
	methods: {
		addInput: function() {
			this.sessionConfig.inputs.push({})
		},
		addComputation: function() {
			this.sessionConfig.computations.push({
				type: '',
				parameters: {},
				title: '',
				description: ''
			})
		},
		create: function() {
			this.$emit("createSession")
		},
	}, 
	components: {
		InputConfig, 
		ComputationConfig, 
	}
}
</script>

<style lang="scss">
</style>
